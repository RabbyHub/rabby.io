import React, { useState, useRef, ReactNode, useEffect } from 'react';

interface HoverPopupProps {
  children: ReactNode | ((active: boolean) => ReactNode); // 支持render prop
  popup: ReactNode;   // 弹窗内容
  popupClassName?: string; // 自定义className
  popupStyle?: React.CSSProperties; // 自定义style
  childrenClassName?: string; // 自定义className
  offsetY?: number; // 弹窗y轴偏移
}

export const HoverPopup: React.FC<HoverPopupProps> = ({
  children,
  popup,
  popupClassName,
  popupStyle,
  childrenClassName = '',
  offsetY = 0,
}) => {
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };
  
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 120);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest(`.${popupClassName}`)) {
      return; // 如果点击的是弹窗内容，不处理
    }
    
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(!show);
  };
  // 处理弹窗内容的点击事件，阻止冒泡
  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handlePopupTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
  };

  // 点击外部关闭弹窗
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    const handleTouchOutside = (event: TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleTouchOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleTouchOutside);
    };
  }, [show]);

  return (
    <div
      ref={containerRef}
      className={childrenClassName}
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
    >
      {typeof children === 'function' ? (children as (active: boolean) => React.ReactNode)(show) : children}
      {show && (
        <div
          className={popupClassName}
          style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            transform: `translate(-50%, calc(-100% - ${offsetY}px))`,
            zIndex: 20,
            ...popupStyle,
          }}
          onClick={handlePopupClick}
          onTouchStart={handlePopupTouchStart}
        >
          {popup}
        </div>
      )}
    </div>
  );
}; 