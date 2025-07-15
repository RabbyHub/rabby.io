import clsx from 'clsx';
import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import styles from './style.module.scss';
import { useIsSmallScreen } from '../../hooks/useIsSmallScreen';

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
  enableAnimation?: boolean; // 新增：控制是否启用动画
  itemWidth?: number; // 新增：子项宽度
  itemSpacing?: number; // 新增：子项间距
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
  enableAnimation = false, // 默认不启用动画
  itemWidth = 400, // 默认子项宽度
  itemSpacing = 20, // 默认子项间距
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollX, setDragStartScrollX] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartScrollX, setTouchStartScrollX] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const [isTrackpadScrolling, setIsTrackpadScrolling] = useState(false);
  const trackpadScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSmallScreen = useIsSmallScreen();
  const [isInView, setIsInView] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        // 当组件进入视口时，触发动画（仅在启用动画时）
        if (entry.isIntersecting && !isInView && enableAnimation) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isInView, enableAnimation]);

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

  useEffect(() => {
    if (!responsive) return;
    
    const handleResize = () => {
      calculateContentWidth();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, calculateContentWidth]);

  // 初始化时计算宽度和高度
  useEffect(() => {
    // 延迟计算，确保DOM已经渲染
    const timer = setTimeout(() => {
      calculateContentWidth();
      
      // 计算卡片高度
      const content = contentRef.current;
      if (content && content.firstElementChild) {
        const firstItem = content.firstElementChild.firstElementChild as HTMLElement;
        if (firstItem) {
          setCardHeight(firstItem.offsetHeight);
        }
      }
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
    if (!container || !content || !autoPlay || isPaused || !isVisible || contentWidth === 0 || isTouching || isTrackpadScrolling) return;

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
  }, [speed, direction, infiniteLoop, contentWidth, autoPlay, isPaused, isVisible, isTouching, isTrackpadScrolling, isSmallScreen]);

  // 启动动画
  useEffect(() => {
    const cleanup = animate();
    return cleanup;
  }, [animate]);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (trackpadScrollTimerRef.current) {
        clearTimeout(trackpadScrollTimerRef.current);
      }
    };
  }, []);

  // 处理点击事件
  const handleItemClick = useCallback((index: number) => {
    if (onItemClick) {
      onItemClick(index);
    }
  }, [onItemClick]);

  // 处理鼠标事件
  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover && !isSmallScreen) {
      setIsPaused(true);
    }
  }, [pauseOnHover, isSmallScreen]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover && !isSmallScreen) {
      setIsPaused(false);
    }
  }, [pauseOnHover, isSmallScreen]);

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

  // 处理触控板滑动事件
  const handleWheel = useCallback((e: React.WheelEvent) => {
    // 检测是否为水平滚动（触控板左右滑动）
    // deltaX 表示水平滚动，deltaY 表示垂直滚动
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
      console.log('Trackpad scroll detected:', { deltaX: e.deltaX, deltaY: e.deltaY });
      e.preventDefault();
      e.stopPropagation();
      
      const content = contentRef.current;
      if (content) {
        const currentTransform = content.style.transform;
        const currentX = parseFloat(currentTransform.replace('translateX(', '').replace('px)', '') || '0');
        const newX = currentX - e.deltaX;
        content.style.transform = `translateX(${newX}px)`;
        
        // 暂停自动滚动
        setIsPaused(true);
        setIsTrackpadScrolling(true);
        
        // 清除之前的定时器
        if (trackpadScrollTimerRef.current) {
          clearTimeout(trackpadScrollTimerRef.current);
        }
        
        // 500ms后恢复自动滚动
        trackpadScrollTimerRef.current = setTimeout(() => {
          setIsPaused(false);
          setIsTrackpadScrolling(false);
        }, 500);
      }
    }
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
    const totalItems = childrenArray.length;
    const centerIndex = Math.floor(totalItems / 2);
    
    return childrenArray.map((child, index) => {
      // 计算每个子项从中心位置到正常位置的位移
      const itemTotalWidth = itemWidth + itemSpacing; // 子项总宽度（宽度+间距）
      const finalTranslateX = index * itemTotalWidth - (centerIndex * itemTotalWidth) + (itemWidth / 2);

      return (
        <div
          key={`item-${index}`}
          className={clsx(styles.item, {
            [styles.clickable]: onItemClick,
            [styles.animate]: isInView && enableAnimation && !isSmallScreen
          })}
          style={{
            animationDelay: (isInView && enableAnimation && !isSmallScreen) ? `${0.3 + index * 0.05}s` : '0s',
            transform: (enableAnimation && !isSmallScreen) ? `translateX(calc(-50% + ${index * 30}px))` : undefined,
            '--final-position': `${finalTranslateX}px`,
            '--initial-offset': `${index * 30}px`,
            opacity: (enableAnimation && !isSmallScreen) ? (isInView ? 1 : 0) : 1, // 小屏幕不展示动画
            zIndex: (enableAnimation && !isSmallScreen) ? (totalItems - index) : undefined // 小屏幕不设置层级
          } as React.CSSProperties}
          data-debug={`index:${index}, finalTranslateX:${finalTranslateX}, enableAnimation:${enableAnimation}`}
          onClick={() => {
            // 小屏幕点击时暂停轮播
            if (isSmallScreen && pauseOnHover) {
              setIsPaused(true);
              // 3秒后自动恢复轮播
              setTimeout(() => {
                setIsPaused(false);
              }, 3000);
            }
            handleItemClick(index);
          }}
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
      );
    });
  }, [children, onItemClick, handleItemClick, isSmallScreen, pauseOnHover, isInView, enableAnimation, itemWidth, itemSpacing]);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.horizontalScroll, className, {
        [styles.dragging]: isDragging,
        [styles.animate]: isInView && enableAnimation
      })}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsPaused(true);
        setIsTouching(true);
        setTouchStartX(e.touches[0].clientX);
        const content = contentRef.current;
        if (content) {
          const transform = content.style.transform;
          const currentX = parseFloat(transform.replace('translateX(', '').replace('px)', '') || '0');
          setTouchStartScrollX(currentX);
        }
      }}
      onTouchMove={(e) => {
        if (isTouching && e.touches.length > 0) {
          e.preventDefault();
          e.stopPropagation();
          const deltaX = e.touches[0].clientX - touchStartX;
          const content = contentRef.current;
          if (content) {
            const newX = touchStartScrollX + deltaX;
            content.style.transform = `translateX(${newX}px)`;
          }
        }
      }}
      onTouchEnd={() => {
        setIsPaused(false);
        setIsTouching(false);
      }}
      onWheel={handleWheel}
      role="region"
      aria-label="Horizontal scrolling content"
    >
      <div
        ref={contentRef}
        className={clsx(styles.content, {
          [styles.dragging]: isDragging,
          [styles.touching]: isTouching,
          [styles.trackpadScrolling]: isTrackpadScrolling,
          [styles.paused]: isPaused,
          [styles.animate]: isInView && enableAnimation && !isSmallScreen
        })}
        style={{
          minHeight: (isInView && enableAnimation && !isSmallScreen && cardHeight > 0) ? `${cardHeight}px` : undefined
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