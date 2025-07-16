import clsx from 'clsx';
import styles from './style.module.scss';
import React, { useRef, useCallback, useState, useEffect } from 'react';
import { useIsSmallScreen } from '../../hooks/useIsSmallScreen';

interface DemoCardProps {
    url: string;
    thumbnail?: string;
    className?: string;
}   

export const DemoCard: React.FC<DemoCardProps> = ({
    url,
    thumbnail,
    className,
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVideoLoading, setIsVideoLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [shouldHideThumbnail, setShouldHideThumbnail] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
    const isSmallScreen = useIsSmallScreen();

    // Intersection Observer 检测视频是否在视口内
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                const isVisible = entry.isIntersecting;
                setIsInView(isVisible);
                
                // 只有在视口内且未加载时才开始加载视频
                if (isVisible && !isVideoLoaded && !shouldLoadVideo) {
                    setShouldLoadVideo(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px' // 提前50px开始加载
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVideoLoaded, shouldLoadVideo]);

    // 组件挂载后立即开始加载视频
    useEffect(() => {
        if (videoRef.current && !isVideoLoaded && shouldLoadVideo) {
            setIsVideoLoading(true);
            setHasError(false);
            setShouldHideThumbnail(false);
            
            const handleCanPlay = () => {
                setIsVideoLoaded(true);
                setIsVideoLoading(false);
                // 延迟隐藏缩略图，避免闪烁
                setTimeout(() => {
                    setShouldHideThumbnail(true);
                }, 100);
                
                // 小屏幕默认自动播放
                if (isSmallScreen && videoRef.current && !hasError) {
                    videoRef.current.loop = true;
                    videoRef.current.play().then(() => {
                        setIsPlaying(true);
                    }).catch((error) => {
                        console.error('Video auto play error:', error);
                    });
                }
            };

            const handleError = () => {
                setHasError(true);
                setIsVideoLoading(false);
            };

            const handleLoadStart = () => {
                setIsVideoLoading(true);
            };

            videoRef.current.addEventListener('canplay', handleCanPlay);
            videoRef.current.addEventListener('error', handleError);
            videoRef.current.addEventListener('loadstart', handleLoadStart);

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('canplay', handleCanPlay);
                    videoRef.current.removeEventListener('error', handleError);
                    videoRef.current.removeEventListener('loadstart', handleLoadStart);
                }
            };
        }
    }, [isVideoLoaded, isSmallScreen, hasError, shouldLoadVideo]);

    // 组件卸载时清理资源
    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.src = '';
                videoRef.current.load();
            }
        };
    }, []);

    const handleMouseEnter = useCallback((e: React.MouseEvent) => {
        // 小屏幕禁用hover效果
        if (isSmallScreen) return;
        
        setIsShaking(true);
        
        if (videoRef.current && isVideoLoaded && !hasError) {
            videoRef.current.loop = true;
            videoRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch((error) => {
                console.error('Video play error:', error);
            });
        }
    }, [isVideoLoaded, hasError, isSmallScreen]);

    const handleMouseLeave = useCallback(() => {
        // 小屏幕禁用hover效果
        if (isSmallScreen) return;
        
        setIsShaking(false);
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.loop = false;
            setIsPlaying(false);
        }
    }, [isSmallScreen]);

    return (
        <div
            ref={containerRef}
            className={clsx(
                styles.demoCard, 
                className,
                {
                    [styles.shakeUpper]: isShaking
                }
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {thumbnail && (
                <img 
                    src={thumbnail} 
                    alt="Video thumbnail"
                    className={clsx(styles.thumbnail, {
                        [styles.hidden]: shouldHideThumbnail && !hasError
                    })}
                />
            )}
            
            {isVideoLoading && (isShaking || isSmallScreen) && (
                <div className={styles.loadingIndicator}>
                    <div className={styles.spinner}></div>
                </div>
            )}
            
            {shouldLoadVideo && (
                <video
                    ref={videoRef}
                    src={url}
                    muted
                    preload="auto"
                    playsInline
                    autoPlay={isSmallScreen}
                    loop={isSmallScreen}
                    className={clsx(styles.video, {
                        [styles.hidden]: !isVideoLoaded || hasError
                    })}
                />
            )}
        </div>
    )
}