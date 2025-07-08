import { HorizontalScroll } from './HorizontalScroll';

const IntergrateChains = ({ chains, rows = 4 }) => {
  // 平均分组
  const groupChains = Array.from({ length: rows }, (_, i) =>
    chains.filter((_, idx) => idx % rows === i)
  );

  return (
    <div className="chains-container">
      {groupChains.map((rowChains, rowIdx) => (
        <div className="chains-row" key={rowIdx} style={{ marginBottom: 64 }}>
          <HorizontalScroll
            speed={70}
            direction={rowIdx % 2 === 0 ? 'right' : 'left'}
            infiniteLoop
            pauseOnHover={false}
            gap={64}
          >
            {rowChains.map(chain => (
              <img
                key={chain.id}
                src={chain.logo_url}
                alt={chain.name}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: 'contain',
                }}
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
