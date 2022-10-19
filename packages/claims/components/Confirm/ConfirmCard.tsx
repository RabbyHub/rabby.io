import React from 'react';
import { useAccount } from 'wagmi';
import { useAsync } from 'react-async-hook';
import { getClaimStatus, getUserClaims } from '../../utils/api';
import { HasSubmittedCard } from '../Content/HasSubmittedCard';
import { Spin } from 'antd';
import { ConfirmCardBody } from './ConfirmCardBody';

export const ConfirmCard = () => {
  const { address = '0x0' } = useAccount();
  const claimStatus = useAsync(getClaimStatus, [address]);
  const userClaims = useAsync(getUserClaims, [address]);
  const [isClaimed, setIsClaimed] = React.useState<boolean>();

  const claimCount = userClaims.result?.length;
  const isLoading = claimStatus.loading || userClaims.loading;

  React.useEffect(() => {
    setIsClaimed(claimStatus.result?.is_claimed);
  }, [claimStatus.result?.is_claimed]);

  if (isClaimed) {
    return <HasSubmittedCard className="mt-4" />;
  }

  if (isLoading) {
    return (
      <div className="mx-auto py-10">
        <Spin />
      </div>
    );
  }

  return (
    <div className="bg-white border-line border rounded-lg overflow-hidden text-left mt-4">
      <div className="bg-line px-6 py-3">
        <h2 className="text-sm font-bold m-0">
          {claimCount ? (
            <span className="break-words">
              <span className="text-highlight">{address}</span> has {claimCount}{' '}
              {claimCount > 1 ? 'claims' : 'claim'} to confirm
            </span>
          ) : (
            <span className="break-words">
              <span className="text-highlight">{address}</span> has no claim
              request to be confirmed
            </span>
          )}
        </h2>
      </div>
      {claimCount && isClaimed === false ? (
        <ConfirmCardBody onSubmit={() => setIsClaimed(true)} />
      ) : null}
    </div>
  );
};
