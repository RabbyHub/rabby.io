import { Button } from 'antd';
import React from 'react';
import { getClaimStatus, postClaim } from '../utils/api';
import { useAccount, useSignMessage } from 'wagmi';
import { useAsync } from 'react-async-hook';

export interface PostClaimButtonProps {
  disabled?: boolean;
}

export const PostClaimButton: React.FC<PostClaimButtonProps> = ({
  disabled
}) => {
  const [loading, setLoading] = React.useState(false);
  const { address = '0x' } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const claimStatus = useAsync(getClaimStatus, [address]);
  const message = claimStatus.result?.text;
  const notAllowed = !address || disabled || loading || !message;

  const handleClick = async () => {
    if (notAllowed) {
      return;
    }

    setLoading(true);

    const signature = await signMessageAsync({
      message
    });

    postClaim(address, signature).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Button
      type="primary"
      disabled={notAllowed}
      loading={loading}
      onClick={handleClick}
    >
      Confirm the claim
    </Button>
  );
};
