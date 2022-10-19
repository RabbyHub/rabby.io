export interface Spender {
  id: string;
  value: number;
  exposure_usd: number;
  protocol: {
    id: string;
    name: string;
    logo_url: string;
    chain: string;
  };
  is_contract: boolean;
  is_open_source: boolean;
  is_hacked: boolean;
  is_abandoned: boolean;
}

export interface TokenApproval {
  id: string;
  name: string;
  symbol: string;
  logo_url: string;
  chain: string;
  price: number;
  balance: number;
  spenders: Spender[];
  sum_exposure_usd: number;
  exposure_balance: number;
}

export interface LostToken {
  chain: string;
  user_addr: string;
  token_symbol: string;
  token_id: string;
  amount: number;
}

export interface ServerChain {
  id: string;
  community_id: number;
  name: string;
  native_token_id: string;
  logo_url: string;
  wrapped_token_id: string;
  symbol: string;
}

export interface UserClaim {
  chain: string;
  user_addr: string;
  usdc_amount: number;
}
