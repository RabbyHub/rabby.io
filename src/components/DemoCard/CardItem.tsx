import clsx from 'clsx';
import styles from './style.module.scss';
import React, { useRef, useCallback } from 'react';

interface DemoCardProps {
    url: string;
    className?: string;
}   

export const DemoCard: React.FC<DemoCardProps> = ({
    url,
    className,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = useCallback(() => {
        if (videoRef.current) {
            // 清除之前的定时器
            if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
                playTimeoutRef.current = null;
            }
            
            // 延迟播放，避免快速hover冲突
            playTimeoutRef.current = setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.loop = true;
                    videoRef.current.play().catch(() => {
                        // 忽略播放错误
                    });
                }
            }, 100);
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (videoRef.current) {
            // 清除播放定时器
            if (playTimeoutRef.current) {
                clearTimeout(playTimeoutRef.current);
                playTimeoutRef.current = null;
            }
            
            // 延迟暂停，避免快速hover冲突
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                    videoRef.current.loop = false;
                }
            }, 50);
        }
    }, []);

    return (
        <div
            className={clsx(styles.demoCard, className)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <video
                ref={videoRef}
                src={url}
                muted
                preload="metadata"
            />
        </div>
    )
}