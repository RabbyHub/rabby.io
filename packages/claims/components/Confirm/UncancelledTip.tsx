import { BASE_PATH } from '../../utils/env';
import { PostClaimButton } from '../PostClaimButton';

export const UncancelledTip = () => {
  return (
    <div className="text-center px-6">
      <div className="text-[#EC5151] text-sm mb-7 max-w-[520px] m-auto flex">
        <img className="w-5 mr-3" src={`${BASE_PATH}/info.svg`} alt="" />
        <div className="text-left">
          The current address has uncanceled approvals for Rabby Swap.{' '}
          <a
            className="underline hover:text-[#EC5151] hover:underline"
            href="https://twitter.com/Rabby_io/status/1579877793642737665"
          >
            Please revoke approvals first to continue the claim process.
          </a>
        </div>
      </div>

      <PostClaimButton disabled />
    </div>
  );
};
