import React from 'react';
import QRCode from 'qrcode.react';

interface QRCodeSVGProps {
  href: string;
  icon: string;
  size?: number;
  iconSize?: number;
  className?: string;
}

export const QRCodeSVG: React.FC<QRCodeSVGProps> = ({
  href,
  icon,
  size = 179,
  iconSize = 32,
  className
}) => {
  return (
    <div className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <QRCode 
        value={href}
        size={size}
        level="M"
        includeMargin={false}
        renderAs="svg"
      />
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: iconSize,
          height: iconSize,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'white',
          borderRadius: '50%',
          justifyContent: 'center',
        }}
      >
        <img 
          src={icon} 
          alt="Icon" 
          width={iconSize} 
          height={iconSize}
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  );
}; 