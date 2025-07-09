import { HorizontalScroll } from "../HorizontalScroll";
import { DemoCard } from "./CardItem";
import styles from './style.module.scss';

const CardList = () => {
    const cardList = [
        {
            color: '#4C65FF',
            image: '/assets/images/hero-1.png',
            title: 'Rabby 钱包安全',
            description: '多重签名、硬件钱包支持，资产安全有保障。',
            buttonText: '了解更多',
            onButtonClick: () => window.open('https://rabby.io/security', '_blank'),
        },
        {
            color: '#9A4CFF',
            image: '/assets/images/hero-2.png',
            title: '一站式多链体验',
            description: '支持主流 EVM 公链，链上资产一目了然。',
            buttonText: '立即体验',
            onButtonClick: () => window.open('https://rabby.io', '_blank'),
        },
        {
            color: '#CE4978',
            image: '/assets/images/hero-3.png',
            title: '极致易用',
            description: '简洁交互，极致流畅，适合新手和资深用户。',
            buttonText: '下载钱包',
            onButtonClick: () => window.open('https://rabby.io/download', '_blank'),
        },
        {
            color: '#D9FFB6',
            image: '/assets/images/hero-4.png',
            title: '丰富生态',
            description: '集成丰富 DApp，生态活跃，玩法多样。',
            buttonText: '探索生态',
            onButtonClick: () => window.open('https://rabby.io/ecosystem', '_blank'),
        },
        {
            color: '#B6B8FF',
            image: '/assets/images/hero-5.png',
            title: '开源透明',
            description: '全部代码开源，社区共建，值得信赖。',
            buttonText: '查看源码',
            onButtonClick: () => window.open('https://github.com/RabbyHub/Rabby', '_blank'),
        },
        {
            color: '#FFB6FD',
            image: '/assets/images/hero-6.png',
            title: '移动端即将上线',
            description: '敬请期待 Rabby 钱包移动端，随时随地管理资产。',
            buttonText: '关注动态',
            onButtonClick: () => window.open('https://twitter.com/RabbyWallet', '_blank'),
        },
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
                {cardList.map((item, index) => (
                    <DemoCard key={index} {...item} />
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
                {cardList.map((item, index) => (
                    <DemoCard key={index} {...item} />
                ))}
                </HorizontalScroll>
            </div>
        </div>
    )
}

export default CardList;