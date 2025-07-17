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
                
                // 提前开始加载视频，不等到完全进入视口
                if (isVisible && !isVideoLoaded && !shouldLoadVideo) {
                    setShouldLoadVideo(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '400px' // 提前400px开始加载，避免loading状态
            }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, [isVideoLoaded, shouldLoadVideo]);

    useEffect(() => {
        if (videoRef.current && !isVideoLoaded && shouldLoadVideo) {
            setIsVideoLoading(true);
            setHasError(false);
            setShouldHideThumbnail(false);
            
            const video = videoRef.current;
            
            // 设置预加载策略 - 提前加载更多数据
            video.preload = 'auto';
            
            const handleCanPlay = () => {
                setIsVideoLoaded(true);
                setIsVideoLoading(false);
                // 立即隐藏缩略图，减少闪烁
                setShouldHideThumbnail(true);
                
                // 小屏幕默认自动播放
                if (isSmallScreen && video && !hasError) {
                    video.loop = true;
                    video.play().then(() => {
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

            // 添加更多事件监听器以优化加载体验
            const handleLoadedData = () => {
                // 第一帧数据加载完成，可以开始播放
                if (isSmallScreen && video && !hasError) {
                    video.play().catch(console.error);
                }
            };

            const handleCanPlayThrough = () => {
                // 视频可以流畅播放，确保加载完成
                setIsVideoLoaded(true);
                setIsVideoLoading(false);
                setShouldHideThumbnail(true);
            };

            video.addEventListener('canplay', handleCanPlay);
            video.addEventListener('canplaythrough', handleCanPlayThrough);
            video.addEventListener('loadeddata', handleLoadedData);
            video.addEventListener('error', handleError);
            video.addEventListener('loadstart', handleLoadStart);

            return () => {
                if (video) {
                    video.removeEventListener('canplay', handleCanPlay);
                    video.removeEventListener('canplaythrough', handleCanPlayThrough);
                    video.removeEventListener('loadeddata', handleLoadedData);
                    video.removeEventListener('error', handleError);
                    video.removeEventListener('loadstart', handleLoadStart);
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
                    // 性能优化属性
                    disablePictureInPicture
                    disableRemotePlayback
                    controlsList="nodownload nofullscreen noremoteplayback"
                    style={{
                        willChange: isVideoLoaded ? 'auto' : 'transform',
                        transform: 'translateZ(0)', // GPU加速
                    }}
                />
            )}
        </div>
    )
}