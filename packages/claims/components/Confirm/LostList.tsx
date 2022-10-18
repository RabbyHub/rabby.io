import { useAsync } from 'react-async-hook';
import { getLostToken } from '../../utils/api';
import { useAccount } from 'wagmi';
import { Table } from 'antd';
import { RABBY_SWAP_ROUTER } from '../../utils/chains';
import { ConfirmTable } from './ConfirmTable';

const { Column } = Table;

export const LostList = () => {
  const { address = '0x0' } = useAccount();
  const lostTokens = useAsync(getLostToken, [address]);

  const data = lostTokens.result;

  return (
    <ConfirmTable headline="Lost Assets">
      <Table dataSource={data}>
        <Column title="Chain" key="chain" dataIndex="chain" />
        <Column
          title="Lost Token"
          key="token_symbol"
          dataIndex="token_symbol"
        />
        <Column
          title="Token Contract Address"
          key="token_address"
          dataIndex="token_symbol"
          render={(tokenSymbol: string) => {
            return RABBY_SWAP_ROUTER[tokenSymbol] ?? '';
          }}
        />
        <Column title="Amount" key="amount" dataIndex="amount" />
      </Table>
    </ConfirmTable>
  );
};
