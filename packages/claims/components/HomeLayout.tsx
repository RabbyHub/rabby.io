import { WalletButton } from '../components/WalletButton';
import { useAccount } from 'wagmi';
import React from 'react';
import { ClaimsSubmissionGuidelinesCard } from './Content/ClaimsSubmissionGuidelinesCard';
import { ConfirmCard } from './Confirm/ConfirmCard';
import { Card } from './Card';

export const HomeLayout = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="max-w-[760px] container mx-auto md:py-[80px] text-center p-4 md:p-0">
      <ClaimsSubmissionGuidelinesCard />

      {/* {mounted && <WalletPanel />} */}
      <Card className="mt-4 font-bold">
        Claim submission has ended. If you have any questions, please contact{' '}
        <a className="underline" href="mailto:rabby@debank.com">
          rabby@debank.com
        </a>
      </Card>
    </div>
  );
};

const WalletPanel = () => {
  const { isConnected } = useAccount();

  return isConnected ? (
    <ConfirmCard />
  ) : (
    <WalletButton className="mt-4 md:mt-[80px]" />
  );
};
