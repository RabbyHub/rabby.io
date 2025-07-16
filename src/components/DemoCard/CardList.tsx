import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import { DemoCard } from "./CardItem";
import styles from './style.module.scss';

const CardList = () => {
    const cardListExtension = [
        {
            url: 'https://static-assets.rabby.io/files/b2156af0-b29a-431e-8650-a72cb2ca65fa.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/80a81992-2394-4405-81be-afce56c4ba93.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/b33e469f-7aec-479f-b647-803a1ce7f2e3.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/042b7d5b-926a-43ec-80b1-6dc5186bc016.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/fcf778ce-d1a6-4e1a-bb0a-d4b6237f20ab.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/0feab942-cccf-4034-a652-3d478339b0bb.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/63144c29-f832-4939-b195-71fb75522a1f.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/47cf47d9-ca2e-46d5-862b-cf3602f2492d.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/21a32b98-ffd4-46c5-a7aa-4ab1f08175f2.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/6704ff3a-0733-4c2d-9c0d-cc6c708a34f2.png',
        }
    ]

    const cardListMobile = [
        {
            url: 'https://static-assets.rabby.io/files/1b78d47b-52cb-42d6-8c8e-a153aab35b2b.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/77a04411-dbc5-4197-96b8-4d2239bf6d58.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/da9ddb2e-aad2-44ac-aa42-c7d1d8f18b69.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/1be93705-8648-465c-b02e-9416d7c39820.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/bb4c22d4-761c-4e90-b48f-13cf15f74fa1.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/f7c069f9-46e4-4968-8c31-02acc6344aca.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/ce451e2a-f573-47c4-a5c8-4fe56b0e3217.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/32bb2ac2-060d-4cb8-8faf-24c2cd323b6b.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/f683b381-b1df-4241-a4dc-e078aa5baa02.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/64656aec-8d65-4b6c-9212-e431eb689e3b.png',
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
                    enableAnimation={false}
                    itemWidth={400}
                    itemSpacing={0}
                    enableDrag={true}
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
                    infiniteLoop={true}
                    autoPlay={true}
                    pauseOnHover={true}
                    enableAnimation={false}
                    itemWidth={400}
                    itemSpacing={0}
                    enableDrag={true}
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