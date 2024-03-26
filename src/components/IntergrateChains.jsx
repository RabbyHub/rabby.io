import { chains } from "../const";

const IntergrateChains = () => {
  return (
    <div className="chains">
      <h2 className="title">Rabby has integrated {chains.length} chains</h2>
      <ul className="chain-list">
        {chains.map((chain) => (
          <li key={chain.id}>
            <img className="chain-logo" src={chain.logo} alt={chain.name} />
            {chain.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntergrateChains;
