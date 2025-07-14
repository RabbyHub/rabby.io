import clsx from 'clsx';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface HorizontalScrollProps {
  children: React.ReactNode;
  speed?: number; // px per second
  direction?: 'left' | 'right';
  className?: string;
  style?: React.CSSProperties;
  infiniteLoop?: boolean;
  pauseOnHover?: boolean;
  responsive?: boolean;
  autoPlay?: boolean;
  onItemClick?: (index: number) => void;
}

export const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  speed = 40,
  direction = 'left',
  className,
  style,
  infiniteLoop = true,
  pauseOnHover = true,
  responsive = true,
  autoPlay = true,
  onItemClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollX, setDragStartScrollX] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 计算内容宽度
  const calculateContentWidth = useCallback(() => {
    if (!infiniteLoop) return;
    const content = contentRef.current;
    if (content) {
      // 获取第一个子容器的宽度（包含所有子项）
      const firstChild = content.firstElementChild as HTMLElement;
      if (firstChild) {
        setContentWidth(firstChild.offsetWidth);
      }
    }
  }, [infiniteLoop]);

  // 响应式处理
  useEffect(() => {
    if (!responsive) return;
    
    const handleResize = () => {
      calculateContentWidth();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, calculateContentWidth]);

  // 初始化时计算宽度
  useEffect(() => {
    // 延迟计算，确保DOM已经渲染
    const timer = setTimeout(() => {
      calculateContentWidth();
    }, 100);
    return () => clearTimeout(timer);
  }, [children, calculateContentWidth]);

  // 初始化位置
  useEffect(() => {
    const content = contentRef.current;
    if (content && infiniteLoop) {
      if (direction === 'right') {
        content.style.transform = `translateX(${-contentWidth}px)`;
      } else {
        content.style.transform = 'translateX(0px)';
      }
    }
  }, [infiniteLoop, direction, contentWidth]);

  // 动画函数
  const animate = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || !autoPlay || isPaused || !isVisible || contentWidth === 0) return;

    let animationFrame: number;
    let pos = parseFloat(content.style.transform.replace('translateX(', '').replace('px)', '') || '0');

    const step = () => {
      if (direction === 'left') {
        pos -= speed / 60;
        if (infiniteLoop && Math.abs(pos) >= contentWidth) {
          pos = 0;
        }
      } else {
        pos += speed / 60;
        if (infiniteLoop && pos >= 0) {
          pos = -contentWidth;
        }
      }
      content.style.transform = `translateX(${pos}px)`;
      animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed, direction, infiniteLoop, contentWidth, autoPlay, isPaused, isVisible]);

  // 启动动画
  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  // 处理点击事件
  const handleItemClick = useCallback((index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  }, [onItemClick]);

  // 处理鼠标事件
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(true);
    }
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) {
      setIsPaused(false);
    }
  }, [pauseOnHover]);

  // 处理鼠标拖拽事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    setIsPaused(true);
    setDragStartX(e.clientX);
    const content = contentRef.current;
    if (content) {
      const transform = content.style.transform;
      const currentX = parseFloat(transform.replace('translateX(', '').replace('px)', '') || '0');
      setDragStartScrollX(currentX);
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - dragStartX;
    const content = contentRef.current;
    if (content) {
      const newX = dragStartScrollX + deltaX;
      content.style.transform = `translateX(${newX}px)`;
    }
  }, [isDragging, dragStartX, dragStartScrollX]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPaused(false);
  }, []);

  // 处理触摸事件
  const handleTouchStart = useCallback(() => {
    setIsPaused(true);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsPaused(false);
  }, []);

  // 添加全局鼠标事件监听
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 渲染子项目
  const renderChildren = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    return childrenArray.map((child, index) => (
      <div
        key={`item-${index}`}
        style={{ 
          display: 'inline-flex',
          cursor: onItemClick ? 'pointer' : 'default'
        }}
        onClick={() => handleItemClick(index)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleItemClick(index);
          }
        }}
        tabIndex={onItemClick ? 0 : -1}
        role={onItemClick ? 'button' : undefined}
        aria-label={onItemClick ? `Item ${index + 1}` : undefined}
      >
        {child}
      </div>
    ));
  }, [children, onItemClick, handleItemClick]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        overflowX: 'hidden',
        overflowY: 'visible',
        width: '100%',
        position: 'relative',
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: isDragging ? 'none' : 'auto',
        ...style,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Horizontal scrolling content"
    >
      <div
        ref={contentRef}
        style={{
          display: 'inline-flex',
          whiteSpace: 'nowrap',
          willChange: 'transform',
          transition: isDragging ? 'none' : (isPaused ? 'transform 0.3s ease-out' : 'none'),
          pointerEvents: isDragging ? 'none' : 'auto',
        }}
      >
        <div style={{ display: 'inline-flex' }}>
          {renderChildren}
        </div>
        {infiniteLoop && (
          <div style={{ display: 'inline-flex' }}>
            {renderChildren}
          </div>
        )}
      </div>
    </div>
  );
}; 