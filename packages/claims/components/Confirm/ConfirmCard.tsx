import React from 'react';
import { useAccount } from 'wagmi';
import { useAsync } from 'react-async-hook';
import {
  getClaimStatus,
  getUsedChainList,
  getUserClaims
} from '../../utils/api';
import { HasSubmittedCard } from '../Content/HasSubmittedCard';

export const ConfirmCard = () => {
  const { address = '0x0' } = useAccount();
  const claimStatus = useAsync(getClaimStatus, [address]);
  const userClaims = useAsync(getUserClaims, [address]);

  const claimCount = userClaims.result?.length;

  if (claimStatus.result?.is_claimed) {
    return <HasSubmittedCard />;
  }

  return (
    <div className="bg-white border-line border rounded-lg overflow-hidden text-left mt-4">
      <div className="bg-line px-6 py-3">
        <h2 className="text-sm font-bold m-0">
          {claimCount ? (
            <span>
              <span>{address}</span> has {claimCount} claims to confirm
            </span>
          ) : (
            <span>
              <span>{address}</span> has no claim request to be confirmed
            </span>
          )}
        </h2>
      </div>
      {claimCount ? <div className="p-6">1</div> : null}
    </div>
  );
};
