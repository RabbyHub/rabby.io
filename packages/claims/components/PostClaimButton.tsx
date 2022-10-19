import { Button, Modal } from 'antd';
import React from 'react';
import { getClaimStatus, postClaim } from '../utils/api';
import { useAccount, useSignMessage } from 'wagmi';
import { useAsync } from 'react-async-hook';

export interface PostClaimButtonProps {
  disabled?: boolean;
  onSubmit?: () => void;
}

export const PostClaimButton: React.FC<PostClaimButtonProps> = ({
  disabled,
  onSubmit
}) => {
  const [loading, setLoading] = React.useState(false);
  const { address = '0x' } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const claimStatus = useAsync(getClaimStatus, [address]);
  const message = claimStatus.result?.text;
  const notAllowed = !address || disabled || loading || !message;

  const handleConfirm = async () => {
    const modal = Modal.confirm({
      content:
        "I've confirmed that the information above is true and correct and I accept the claim.",
      okText: 'Sign',
      cancelText: 'Cancel',
      onOk: () => {
        handleSign();
        modal.destroy();
      }
    });
  };

  const handleSign = async () => {
    if (notAllowed) {
      return;
    }

    setLoading(true);

    try {
      const signature = await signMessageAsync({
        message
      });

      await postClaim(address, signature);
      onSubmit?.();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="primary"
      disabled={notAllowed}
      loading={loading}
      onClick={handleConfirm}
    >
      Confirm the claim to apply
    </Button>
  );
};
