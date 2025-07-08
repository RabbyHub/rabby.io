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
                {image && <img src={image} alt={title} style={{width: '100%', borderRadius: 12, marginBottom: 24}} />}
                {title && <h3 style={{margin: '12px 0', color: '#fff', fontSize: 28}}>{title}</h3>}
                {description && <p style={{color: '#fff', fontSize: 18, marginBottom: 24}}>{description}</p>}
                {buttonText && <button style={{padding: '10px 24px', borderRadius: 8, background: '#4C65FF', color: '#fff', border: 'none', fontSize: 16, cursor: 'pointer'}} onClick={onButtonClick}>{buttonText}</button>}
            </div>
        </div>
    )
}