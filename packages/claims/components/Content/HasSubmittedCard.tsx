import { Card } from '../Card';
import { useAccount } from 'wagmi';

export const HasSubmittedCard = () => {
  const { address } = useAccount();

  return (
    <Card headline="Your application has been submitted. Claims will be processed within 3 business days. Please follow the official Twitter account for further progress">
      Claim payout recipient address: <span>{address}</span>
    </Card>
  );
};
