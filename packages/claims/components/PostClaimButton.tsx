import { Button } from 'antd';
import React from 'react';
import { postClaim } from '../utils/api';
import { useAccount, useSignMessage } from 'wagmi';

export const PostClaimButton = () => {
  const [loading, setLoading] = React.useState(false);
  const { address = '0x' } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const handleClick = async () => {
    setLoading(true);

    const signature = await signMessageAsync({
      message: 'message'
    });

    postClaim(address, signature).finally(() => {
      setLoading(false);
    });
  };

  return (
    <Button disabled={loading} loading={loading} onClick={handleClick}>
      Confirm the claim
    </Button>
  );
};
