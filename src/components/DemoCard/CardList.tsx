import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import { DemoCard } from "./CardItem";
import styles from './style.module.scss';

const CardList = () => {
    const cardListExtension = [
        {
            url: 'https://static-assets.rabby.io/files/49b97905-a496-4ba3-859f-1b1e9e6bf3ab.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/80a81992-2394-4405-81be-afce56c4ba93.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/968313a4-ec8e-451d-b566-05ed0dbe41da.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/042b7d5b-926a-43ec-80b1-6dc5186bc016.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/175cae7d-c44a-4306-98c6-6722e7c33438.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/0feab942-cccf-4034-a652-3d478339b0bb.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/36a26a72-36d2-4512-8ec4-a2684a8b9dfe.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/47cf47d9-ca2e-46d5-862b-cf3602f2492d.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/a0cba8b9-1b60-41d9-9b6e-e7f4f5a2d6cd.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/6704ff3a-0733-4c2d-9c0d-cc6c708a34f2.png',
        }
    ]

    const cardListMobile = [
        {
            url: 'https://static-assets.rabby.io/files/84406d5b-1145-4d36-92f4-6eef71e4501a.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/77a04411-dbc5-4197-96b8-4d2239bf6d58.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/85cff6ba-827d-4059-991e-1b54e33d843a.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/1be93705-8648-465c-b02e-9416d7c39820.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/bc43d232-3b51-4260-97d0-aaf224a6ad64.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/f7c069f9-46e4-4968-8c31-02acc6344aca.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/30c59bd5-ec61-497b-bc98-e5b24bf41efb.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/32bb2ac2-060d-4cb8-8faf-24c2cd323b6b.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/c36d5b67-b2ff-49e9-b9b7-7d75b32d2f8b.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/64656aec-8d65-4b6c-9212-e431eb689e3b.png',
        }
    ]
    return (
        <div className={styles.cardList}>
            <div className={styles.row}>
                <HorizontalScroll
                    speed={40}
                    direction="left"
                    infiniteLoop={false}
                    autoPlay={true}
                    pauseOnHover={true}
                    enableAnimation={true}
                    itemWidth={400}
                    itemSpacing={0}
                >
                {cardListExtension.map((item, index) => (
                    <DemoCard key={index} url={item.url} thumbnail={item.thumbnail} />
                ))}
                </HorizontalScroll>
            </div>
            <div className={styles.row}>
                <HorizontalScroll
                    speed={40}
                    direction="right"
                    infiniteLoop={false}
                    autoPlay={true}
                    pauseOnHover={true}
                    enableAnimation={true}
                    itemWidth={400}
                    itemSpacing={0}
                >
                {cardListMobile.map((item, index) => (
                    <DemoCard key={index} url={item.url} thumbnail={item.thumbnail} className={styles.mobileCard} />
                ))}
                </HorizontalScroll>
            </div>
        </div>
    )
}

export default CardList;