const IntergrateChains = ({ chains }) => {
  return (
    <div className="chains">
      <h2 className="title">Rabby has integrated {chains?.length} chains
      <a className='goto-dashboard' href='/chain-dashboard' target='_blank' rel="noreferrer">View Chain Dashboard
      <img src='/assets/chain-dashboard/arrow-right.svg' alt=''/>
      </a>
      </h2>
      <ul className="chain-list">
        {chains?.map((chain) => (
          <li key={chain.id}>
            <img className="chain-logo" src={chain.logo_url} alt={chain.name} />
            {chain.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IntergrateChains;
