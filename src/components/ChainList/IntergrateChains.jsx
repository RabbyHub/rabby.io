import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll';
import styles from './style.module.scss';
const IntergrateChains = ({ chains, rows = 4 }) => {
  // 平均分组
  const groupChains = Array.from({ length: rows }, (_, i) =>
    chains.filter((_, idx) => idx % rows === i)
  );

  return (
    <div className={styles.chainsContainer}>
      {groupChains.map((rowChains, rowIdx) => (
        <div className={styles.chainsRow} key={rowIdx}>
          <HorizontalScroll
            speed={70}
            direction={rowIdx % 2 === 0 ? 'right' : 'left'}
            infiniteLoop
            pauseOnHover={true}
          >
            {rowChains.map(chain => (
              <img
                className={styles.chainItem}
                key={chain.id}
                src={chain.logo_url}
                alt={chain.name}
                title={chain.name}
              />
            ))}
          </HorizontalScroll>
        </div>
      ))}
    </div>
  );
};

export default IntergrateChains;
