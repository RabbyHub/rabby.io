import { HorizontalScroll } from "../HorizontalScroll/HorizontalScroll";
import { DemoCard } from "./CardItem";
import styles from './style.module.scss';

const CardList = () => {
    const cardListExtension = [
        {
            url: 'https://static-assets.rabby.io/files/4b6186dd-a410-4d8a-a09d-41474fa5269e.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/80a81992-2394-4405-81be-afce56c4ba93.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/0010b762-8b4c-426f-a044-3d63ec462673.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/042b7d5b-926a-43ec-80b1-6dc5186bc016.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/426143ad-ddce-41ea-a19c-42e2082fec1e.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/0feab942-cccf-4034-a652-3d478339b0bb.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/d47052c5-4cdf-4771-b5af-7ebd4eb8f212.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/47cf47d9-ca2e-46d5-862b-cf3602f2492d.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/8b75d08b-5c41-446b-9827-e93973b6a64f.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/6704ff3a-0733-4c2d-9c0d-cc6c708a34f2.png',
        }
    ]

    const cardListMobile = [
        {
            url: 'https://static-assets.rabby.io/files/6a1a9ea0-dfcf-4070-a0fc-3ae96eca5959.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/77a04411-dbc5-4197-96b8-4d2239bf6d58.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/0b257163-812c-493f-9953-2435c4cd8aa4.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/1be93705-8648-465c-b02e-9416d7c39820.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/eaffb3e8-7322-4c40-8f38-4cc70a780f86.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/f7c069f9-46e4-4968-8c31-02acc6344aca.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/84f872d9-09ce-4e6a-a4d1-c068613af0e4.mp4',
            thumbnail: 'https://static-assets.rabby.io/files/32bb2ac2-060d-4cb8-8faf-24c2cd323b6b.png',
        },
        {
            url: 'https://static-assets.rabby.io/files/7e1b859c-f245-4349-89af-fa2c1358d991.mp4',
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