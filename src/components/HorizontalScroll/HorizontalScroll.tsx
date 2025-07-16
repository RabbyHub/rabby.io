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
  enableDrag?: boolean; // 新增：控制是否支持左右拖拽
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
  enableDrag = false, // 默认不启用拖拽
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartScrollX, setDragStartScrollX] = useState(0);
  const [isTrackpadScrolling, setIsTrackpadScrolling] = useState(false);
  const trackpadScrollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const isSmallScreen = useIsSmallScreen();
  const [isInView, setIsInView] = useState(false);
  const [cardHeight, setCardHeight] = useState(0);
  const [paddingWidth, setPaddingWidth] = useState(80);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [isInfiniteLoopReady, setIsInfiniteLoopReady] = useState(false);
  const animationDuration = 400; // 动画持续时间0.4秒

  // 触摸事件相关状态
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartScrollX, setTouchStartScrollX] = useState(0);
  const [isHorizontalSwipe, setIsHorizontalSwipe] = useState(false);

  // 计算边界限制的辅助函数
  const getBoundedPosition = useCallback((position: number): number => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return position;

    const containerWidth = container.offsetWidth;
    const contentWidth = content.scrollWidth;
    const maxScrollLeft = paddingWidth; // 最左边边界
    const minScrollLeft = -(contentWidth - containerWidth) - paddingWidth; // 最右边边界, 留出一些余量

    return Math.max(minScrollLeft, Math.min(maxScrollLeft, position));
  }, []);

  // 设置容器高度的辅助函数
  const setContainerHeight = useCallback((height: number) => {
    const content = contentRef.current;
    if (content && enableAnimation && !isSmallScreen && !isInView && height > 0) {
      content.style.minHeight = `${height}px`;
    }
  }, [enableAnimation, isSmallScreen, isInView]);


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
      
      // 重新计算卡片高度
      const content = contentRef.current;
      if (content && content.firstElementChild) {
        const firstItem = content.firstElementChild.firstElementChild as HTMLElement;
        if (firstItem) {
          const itemHeight = firstItem.offsetHeight;
          setCardHeight(itemHeight);
          setContainerHeight(itemHeight);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [responsive, calculateContentWidth, setContainerHeight]);

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
          const itemHeight = firstItem.offsetHeight;
          setCardHeight(itemHeight);
          setContainerHeight(itemHeight);
        }
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [children, calculateContentWidth, setContainerHeight]);

  // 监听动画完成
  useEffect(() => {
    if (enableAnimation && isInView && !animationCompleted) {
      const timer = setTimeout(() => {
        setAnimationCompleted(true);
        // 动画完成后，重新计算内容宽度并准备无限循环
        setTimeout(() => {
          calculateContentWidth();
          setIsInfiniteLoopReady(true);
          
          // 确保动画完成后，内容位置正确设置
          const content = contentRef.current;
          if (content && infiniteLoop) {
            // 根据动画结束位置设置无限循环的初始位置
            const currentTransform = content.style.transform;
            const currentX = parseFloat(currentTransform.replace('translateX(', '').replace('px)', '') || '0');
            
            if (direction === 'right') {
              // 向右滚动时，从当前位置开始
              content.style.transform = `translateX(${currentX}px)`;
            } else {
              // 向左滚动时，从当前位置开始
              content.style.transform = `translateX(${currentX}px)`;
            }
          }
        }, 50); // 短暂延迟确保DOM更新
      }, animationDuration);
      
      return () => clearTimeout(timer);
    } else if (!enableAnimation) {
      // 当动画未启用时，直接设置无限循环为准备就绪状态
      setIsInfiniteLoopReady(true);
      setAnimationCompleted(true);
    }
  }, [enableAnimation, isInView, animationCompleted, calculateContentWidth, infiniteLoop, direction, contentWidth]);

  // 初始化位置
  useEffect(() => {
    const content = contentRef.current;
    if (content && infiniteLoop && contentWidth > 0) {
      // 当动画未启用时，直接设置初始位置
      // 当动画启用时，只有在动画已完成的情况下才设置初始位置
      if (!enableAnimation || (enableAnimation && animationCompleted && isInfiniteLoopReady)) {
        if (direction === 'right') {
          content.style.transform = `translateX(${-contentWidth}px)`;
        } else {
          content.style.transform = 'translateX(0px)';
        }
      }
    }
  }, [infiniteLoop, direction, contentWidth, isInfiniteLoopReady, enableAnimation, animationCompleted]);

  // 动画函数
  const animate = useCallback(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content || !autoPlay || isPaused || !isVisible || contentWidth === 0 || isTrackpadScrolling || isTouching) return;
    
    // 如果启用了动画且动画未完成，不开始无限循环
    if (enableAnimation && !animationCompleted) return;
    
    // 如果启用了动画但无限循环未准备好，不开始动画
    if (enableAnimation && !isInfiniteLoopReady) return;

    let animationFrame: number;
    let pos = parseFloat(content.style.transform.replace('translateX(', '').replace('px)', '') || '0');

    const step = () => {
      if (direction === 'left') {
        pos -= speed / 60;
        if (infiniteLoop && Math.abs(pos) >= contentWidth) {
          pos = 0;
        } else if (!infiniteLoop) {
          // 非无限循环时，使用边界限制函数
          pos = getBoundedPosition(pos);
        }
      } else {
        pos += speed / 60;
        if (infiniteLoop && pos >= 0) {
          pos = -contentWidth;
        } else if (!infiniteLoop) {
          // 非无限循环时，使用边界限制函数
          pos = getBoundedPosition(pos);
        }
      }
      content.style.transform = `translateX(${pos}px)`;
      animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [speed, direction, infiniteLoop, contentWidth, autoPlay, isPaused, isVisible, isTrackpadScrolling, isTouching, isSmallScreen, getBoundedPosition, enableAnimation, animationCompleted, isInfiniteLoopReady]);

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
    if (!enableDrag || isSmallScreen) return;
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
  }, [enableDrag, isSmallScreen]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || isSmallScreen) return;
    
    e.preventDefault(); // 阻止浏览器默认行为
    e.stopPropagation();
    const deltaX = e.clientX - dragStartX;
    const content = contentRef.current;
    if (content) {
      const newX = dragStartScrollX + deltaX;
      
      // 使用边界限制函数
      const limitedX = getBoundedPosition(newX);
      content.style.transform = `translateX(${limitedX}px)`;
    }
  }, [isDragging, dragStartX, dragStartScrollX, getBoundedPosition, isSmallScreen]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsPaused(false);
  }, []);

  // 处理触摸事件
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isSmallScreen) {
      const touch = e.touches[0];
      setTouchStartX(touch.clientX);
      setTouchStartY(touch.clientY);
      setIsTouching(true);
      setIsPaused(true);
      
      const content = contentRef.current;
      if (content) {
        const transform = content.style.transform;
        const currentX = parseFloat(transform.replace('translateX(', '').replace('px)', '') || '0');
        setTouchStartScrollX(currentX);
      }
    }
  }, [isSmallScreen]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isTouching || !isSmallScreen) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    
    // 判断是否为水平滑动
    if (!isHorizontalSwipe && Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      setIsHorizontalSwipe(true);
    }
    
    // 如果是水平滑动，阻止默认行为并处理滑动
    if (isHorizontalSwipe && e.cancelable) {
      e.preventDefault();
      e.stopPropagation();
      
      const content = contentRef.current;
      if (content) {
        const newX = touchStartScrollX + deltaX;
        const limitedX = getBoundedPosition(newX);
        content.style.transform = `translateX(${limitedX}px)`;
      }
    }
  }, [isTouching, isSmallScreen, touchStartX, touchStartY, touchStartScrollX, isHorizontalSwipe, getBoundedPosition]);

  const handleTouchEnd = useCallback(() => {
    if (isSmallScreen) {
      setIsTouching(false);
      setIsHorizontalSwipe(false);
      
      // 延迟恢复自动播放，避免触摸结束后立即开始动画
      setTimeout(() => {
        setIsPaused(false);
      }, 300);
    }
  }, [isSmallScreen]);

  // 处理触控板滑动事件（仅桌面端）
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isSmallScreen) return; // 移动端不处理wheel事件
    
    // 检测是否为水平滚动（触控板左右滑动）
    // deltaX 表示水平滚动，deltaY 表示垂直滚动
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 5) {
      e.preventDefault(); // 阻止浏览器默认行为，防止后退操作
      e.stopPropagation();
      
      const content = contentRef.current;
      if (content) {
        const currentTransform = content.style.transform;
        const currentX = parseFloat(currentTransform.replace('translateX(', '').replace('px)', '') || '0');
        const newX = currentX - e.deltaX;
        
        // 使用边界限制函数
        const limitedX = getBoundedPosition(newX);
        content.style.transform = `translateX(${limitedX}px)`;
        
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
  }, [getBoundedPosition, isSmallScreen]);

  // 手动添加wheel事件监听器，设置passive: false（仅桌面端）
  useEffect(() => {
    if (isSmallScreen) return; // 移动端不添加wheel事件
    
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      handleWheel(e);
    };

    // 添加事件监听器，设置passive: false以允许preventDefault
    container.addEventListener('wheel', wheelHandler, { passive: false });

    return () => {
      container.removeEventListener('wheel', wheelHandler);
    };
  }, [handleWheel, isSmallScreen]);

  // 添加全局鼠标事件监听（仅桌面端）
  useEffect(() => {
    if (isDragging && !isSmallScreen) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp, isSmallScreen]);

  // 添加全局触摸事件监听（仅移动端）
  useEffect(() => {
    if (isTouching && isSmallScreen) {
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      return () => {
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isTouching, handleTouchMove, handleTouchEnd, isSmallScreen]);

  // 渲染子项目
  const renderChildren = useMemo(() => {
    const childrenArray = React.Children.toArray(children);
    const totalItems = childrenArray.length;
    const centerIndex = Math.floor(totalItems / 2);
    
    return childrenArray.map((child, index) => {
      // 计算每个子项从中心位置到正常位置的位移
      const itemTotalWidth = itemWidth + itemSpacing; // 子项总宽度（宽度+间距）
      const finalTranslateX = index * itemTotalWidth - (centerIndex * itemTotalWidth) + (itemWidth / 2) - paddingWidth;

      // 动画完成后，使用正常的inline-flex布局
      const isAnimating = enableAnimation && isInView && !isSmallScreen && !animationCompleted;
      
      // 动画没出现时，确保卡片不可见
      const shouldShowInitialState = enableAnimation && !isSmallScreen && !isInView;
      
      // 计算初始错开距离，让卡片在动画开始时有一定间距
      const initialOffset = index * 20 - (totalItems - 1) * 10;

      return (
        <div
          key={`item-${index}`}
          className={clsx(styles.item, {
            [styles.clickable]: onItemClick,
            [styles.animate]: isAnimating,
            [styles.initialState]: shouldShowInitialState
          })}
          style={{
            animationDelay: isAnimating ? `${0.1 + index * 0.05}s` : '0s',
            '--final-position': `${finalTranslateX}px`,
            '--initial-offset': `${initialOffset}px`,
            opacity: shouldShowInitialState ? 0 : (isAnimating ? (isInView ? 1 : 0) : 1), // 初始状态完全隐藏
            zIndex: isAnimating ? (totalItems - index) : undefined, // 小屏幕不设置层级
            // 动画完成后，确保位置正确
            position: (enableAnimation && animationCompleted) ? 'static' : (shouldShowInitialState || isAnimating ? 'absolute' : undefined),
            // 初始状态时居中显示
            left: shouldShowInitialState ? '50%' : (isAnimating ? '50%' : undefined),
            transform: shouldShowInitialState || isAnimating ? `translateX(calc(-50% + ${initialOffset}px))` : undefined
          } as React.CSSProperties}
          data-debug={`index:${index}, finalTranslateX:${finalTranslateX}, enableAnimation:${enableAnimation}, animationCompleted:${animationCompleted}, isInView:${isInView}`}
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
  }, [children, onItemClick, handleItemClick, isSmallScreen, pauseOnHover, isInView, enableAnimation, itemWidth, itemSpacing, animationCompleted, paddingWidth]);

  return (
    <div
      ref={containerRef}
      className={clsx(styles.horizontalScroll, className, {
        [styles.dragging]: isDragging,
        [styles.touching]: isTouching,
        [styles.animate]: enableAnimation && isInView && !animationCompleted
      })}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
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
          [styles.animate]: enableAnimation && isInView && !animationCompleted && !isSmallScreen,
          [styles.initialState]: enableAnimation && !isSmallScreen && !isInView
        })}
        style={{
          minHeight: (enableAnimation && isInView && !animationCompleted && !isSmallScreen && cardHeight > 0) ? `${cardHeight}px` : 
                    (enableAnimation && !isSmallScreen && !isInView && cardHeight > 0) ? `${cardHeight}px` : undefined
        }}
      >
        <div style={{ display: 'inline-flex' }}>
          {renderChildren}
        </div>
        {infiniteLoop && (isInfiniteLoopReady || !enableAnimation) && (
          <div style={{ display: 'inline-flex' }}>
            {renderChildren}
          </div>
        )}
      </div>
    </div>
  );
}; 