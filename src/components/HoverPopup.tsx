import React, { useState, useRef, ReactNode } from 'react';

interface HoverPopupProps {
  children: ReactNode; // 触发 hover 的对象
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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShow(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setShow(false), 120);
  };

  return (
    <div
      className={childrenClassName}
      style={{ display: 'inline-block', position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
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
        >
          {popup}
        </div>
      )}
    </div>
  );
}; 