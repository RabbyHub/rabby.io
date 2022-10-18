import { PostClaimButton } from '../PostClaimButton';

export const UncancelledTip = () => {
  return (
    <div className="text-center py-10">
      <p className="text-[#EC5151] text-sm mb-4 max-w-[520px] m-auto">
        The current address has uncanceled approvals for Rabby Swap.{' '}
        <a
          className="underline "
          href="https://twitter.com/Rabby_io/status/1581272081127571456"
        >
          Please revoke approvals first to continue the claim process.
        </a>
      </p>

      <PostClaimButton disabled />
    </div>
  );
};
