import styles from './style.module.scss';

interface DemoCardProps {
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    image?: string;
    title?: string;
    description?: string;
    buttonText?: string;
    onButtonClick?: () => void;
}   

export const DemoCard: React.FC<DemoCardProps> = ({
    className,
    style,
    color,
    image,
    title,
    description,
    buttonText,
    onButtonClick
}) => {
    return (
        <div className={styles.demoCard} style={{ backgroundColor: color }}>
            <div className={styles.demoCardContent}>
            </div>
        </div>
    )
}