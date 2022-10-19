import { BASE_PATH } from '../../utils/env';
import { PostClaimButton } from '../PostClaimButton';

export const UncancelledTip = () => {
  return (
    <div className="text-center py-10 px-6">
      <p className="text-[#EC5151] text-sm mb-7 max-w-[520px] m-auto flex ">
        <img className="w-5 mr-3" src={`${BASE_PATH}/info.svg`} alt="" />
        <div className="text-left">
          The current address has uncanceled approvals for Rabby Swap.{' '}
          <a
            className="underline "
            href="https://twitter.com/Rabby_io/status/1581272081127571456"
          >
            Please revoke approvals first to continue the claim process.
          </a>
        </div>
      </p>

      <PostClaimButton disabled />
    </div>
  );
};
