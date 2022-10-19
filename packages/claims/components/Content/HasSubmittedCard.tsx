import { Card } from '../Card';
import { useAccount } from 'wagmi';

interface HasSubmittedCardProps {
  className?: string;
}

export const HasSubmittedCard: React.FC<HasSubmittedCardProps> = ({
  className
}) => {
  const { address } = useAccount();

  return (
    <Card className={className}>
      <div className="text-sm font-bold text-headline">
        <h2 className="mb-4 text-sm text-headline font-bold">
          Your application has been submitted. Claims will be processed within 3
          business days. Please follow the official Twitter account for further
          progress
        </h2>
        <span>Claim payout recipient address:</span>{' '}
        <span className="text-content break-words">{address}</span>
      </div>
    </Card>
  );
};
