import React from 'react';
import { useAccount, useConnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { Button, ButtonProps } from 'antd';

export const WalletButton: React.FC<ButtonProps> = (props) => {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector()
  });

  if (isConnected) return null;

  return (
    <Button type="primary" onClick={() => connect()} {...props}>
      Connect your wallet to confirm the claim
    </Button>
  );
};
