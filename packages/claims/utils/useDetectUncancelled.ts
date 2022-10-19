import React from 'react';
import { getTokenAuthorizedList } from './api';
import {
  CHAINS_BY_SERVER_ID,
  CLAIM_CHIAN_LIST,
  RABBY_SWAP_ROUTER
} from './chains';

export const useDetectUncancelled = (address: string) => {
  const [uncancelledSwap, setUncancelledSwap] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      for (const chainId of CLAIM_CHIAN_LIST) {
        const chain = CHAINS_BY_SERVER_ID[chainId];
        const swapAddress = RABBY_SWAP_ROUTER[chain.enum];
        const tokenList = await getTokenAuthorizedList(address, chainId);
        const uncancelledSwap = tokenList.find((token) =>
          token.spenders.find((spender) => spender.id === swapAddress)
        );

        if (uncancelledSwap) {
          setUncancelledSwap(true);
          return;
        }
      }
    };

    fetchData();
  }, [address]);

  return uncancelledSwap;
};
