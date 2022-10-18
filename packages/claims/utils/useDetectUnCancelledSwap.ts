import React from 'react';
import { getTokenAuthorizedList } from './api';
import { CLAIM_CHIAN_LIST, RABBY_SWAP_ROUTER } from './chains';

export const useDetectUnCancelledSwap = (address: string) => {
  const [unCancelledSwap, setUnCancelledSwap] = React.useState(false);

  React.useEffect(() => {
    const fetchData = async () => {
      for (const chainId of CLAIM_CHIAN_LIST) {
        const swapAddress = RABBY_SWAP_ROUTER[chainId];
        const tokenList = await getTokenAuthorizedList(address, chainId);
        const unCancelledSwap = tokenList.find((token) =>
          token.spenders.find((spender) => spender.id === swapAddress)
        );
        if (unCancelledSwap) {
          setUnCancelledSwap(true);
          return;
        }
      }
    };

    fetchData();
  }, [address]);

  return unCancelledSwap;
};
