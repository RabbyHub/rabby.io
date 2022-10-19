import { Card } from '../Card';

export const ClaimsSubmissionGuidelinesCard = () => {
  return (
    <Card
      headline="Claim Submission Guidelines for Rabby Insurance Fund"
      hasLogo
    >
      <p>
        Rabby Insurance Fund was established to safeguard Rabby users' funds
        against hacking events. Rabby users affected by the Rabby Swap contract
        hack on October 11 are qualified to apply for a claim payout after
        confirmation.
      </p>
      <p>
        Initial Funding: $1,000,000.00
        <br></br>The total amount of this claim: $202,607.90
        <br></br>Balance of the Insurance Fund: $797,392.10
      </p>
      <p className="font-bold">
        To start claim processing please follow the rules below:
      </p>
      <ol className="pl-4">
        <li>
          Loss caused by uncanceled or untimely cancellation of approvals by
          users is not qualified for a claim payout
        </li>
        <li>
          By December 1, 2022, all the unconfirmed claims are deemed to have
          been abandoned by the user.
        </li>
        <li>
          Claims will be processed within 3 business days after being confirmed
          and signed.
        </li>
      </ol>
    </Card>
  );
};
