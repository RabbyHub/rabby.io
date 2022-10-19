import { useAsync } from 'react-async-hook';
import { getLostToken } from '../../utils/api';
import { useAccount } from 'wagmi';
import { Table } from 'antd';
import { ConfirmTable } from './ConfirmTable';
import { CHAINS_BY_SERVER_ID } from '../../utils/chains';

const { Column } = Table;

export const LostList = () => {
  const { address = '0x0' } = useAccount();
  const lostTokens = useAsync(getLostToken, [address]);

  const data = lostTokens.result;

  if (lostTokens.loading) {
    return null;
  }

  return (
    <ConfirmTable headline="Lost Assets">
      <Table
        dataSource={data}
        pagination={false}
        rowKey={(record) => record.chain + record.amount}
        scroll={{
          x: 'max-content'
        }}
      >
        <Column
          title="Chain"
          key="chain"
          dataIndex="chain"
          render={(chain) => CHAINS_BY_SERVER_ID[chain].name}
        />
        <Column
          title="Lost Token"
          key="token_symbol"
          dataIndex="token_symbol"
        />
        <Column
          title="Token Contract Address"
          key="token_address"
          dataIndex="token_id"
        />
        <Column title="Amount" key="amount" dataIndex="amount" />
      </Table>
    </ConfirmTable>
  );
};
