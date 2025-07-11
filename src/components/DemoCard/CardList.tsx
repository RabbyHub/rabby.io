import { HorizontalScroll } from "../HorizontalScroll";
import { DemoCard } from "./CardItem";
import styles from './style.module.scss';

const CardList = () => {
    const cardListExtension = [
        {
            url: '/assets/demo/extension-1.mp4',
            thumbnail: '/assets/demo/extension-1-thumb.png',
        },
        {
            url: '/assets/demo/extension-2.mp4',
            thumbnail: '/assets/demo/extension-2-thumb.png',
        },
        {
            url: '/assets/demo/extension-3.mp4',
            thumbnail: '/assets/demo/extension-3-thumb.png',
        },
        {
            url: '/assets/demo/extension-4.mp4',
            thumbnail: '/assets/demo/extension-4-thumb.png',
        },
        {
            url: '/assets/demo/extension-5.mp4',
            thumbnail: '/assets/demo/extension-5-thumb.png',
        }
    ]

    const cardListMobile = [
        {
            url: '/assets/demo/mobile-1.mp4',
        },
        {
            url: '/assets/demo/mobile-2.mp4',
        },
        {
            url: '/assets/demo/mobile-3.mp4',
        },
        {
            url: '/assets/demo/mobile-4.mp4',
        },
        {
            url: '/assets/demo/mobile-5.mp4',
        }
    ]
    return (
        <div className={styles.cardList}>
            <div className={styles.row}>
                <HorizontalScroll
                    speed={40}
                    direction="left"
                    infiniteLoop={true}
                    autoPlay={true}
                    pauseOnHover={true}
                >
                {cardListExtension.map((item, index) => (
                    <DemoCard key={index} url={item.url} />
                ))}
                </HorizontalScroll>
            </div>
            <div className={styles.row}>
                <HorizontalScroll
                    speed={40}
                    direction="right"
                    infiniteLoop={true}
                    autoPlay={true}
                    pauseOnHover={true}
                >
                {cardListMobile.map((item, index) => (
                    <DemoCard key={index} url={item.url} className={styles.mobileCard} />
                ))}
                </HorizontalScroll>
            </div>
        </div>
    )
}

export default CardList;