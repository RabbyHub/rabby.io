import { useAsync } from 'react-async-hook';
import { getUserClaims } from '../../utils/api';
import { useAccount } from 'wagmi';
import { Table } from 'antd';
import { ConfirmTable } from './ConfirmTable';

const { Column } = Table;

export const LostList = () => {
  const { address = '0x0' } = useAccount();
  const userClaims = useAsync(getUserClaims, [address]);

  const data = userClaims.result;

  return (
    <ConfirmTable headline="Claim Payout">
      <Table dataSource={data}>
        <Column
          title="Recipient Address"
          key="recipient_address"
          dataIndex="user_addr"
        />
        <Column title="Chain" key="chain" dataIndex="chain" />

        <Column title="Pay Token" key="pay_token" render={() => 'USDC'} />
        <Column title="Amount" key="amount" dataIndex="usdc_amount" />
      </Table>
    </ConfirmTable>
  );
};
