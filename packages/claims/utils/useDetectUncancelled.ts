import React from 'react';
import { getTokenAuthorizedList } from './api';
import {
  CHAINS_BY_SERVER_ID,
  CLAIM_CHIAN_LIST,
  RABBY_SWAP_ROUTER
} from './chains';

export const useDetectUncancelled = (address: string) => {
  const [hasUncancelled, setHasUncancelled] = React.useState(false);
  const [uncancelledChains, setUncancelledChains] = React.useState<string[]>();

  const fetchData = React.useCallback(async (address: string) => {
    const chains = [];
    for (const chainId of CLAIM_CHIAN_LIST) {
      const chain = CHAINS_BY_SERVER_ID[chainId];
      const swapAddress = RABBY_SWAP_ROUTER[chain.enum];
      const tokenList = await getTokenAuthorizedList(address, chainId);
      const hasUncancelled = tokenList.find((token) =>
        token.spenders.find((spender) => spender.id === swapAddress)
      );

      if (hasUncancelled) {
        chains.push(chain.name);
        setHasUncancelled(true);
      }
    }

    setUncancelledChains(chains);
  }, []);

  React.useEffect(() => {
    // reset
    setHasUncancelled(false);
    setUncancelledChains(undefined);

    fetchData(address);
  }, [address]);

  return { uncancelledChains, hasUncancelled };
};
