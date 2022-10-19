import axios from 'axios';
import { LostToken, ServerChain, TokenApproval, UserClaim } from './types';
import { setupCache } from 'axios-cache-interceptor';

export const api = setupCache(
  axios.create({
    baseURL:
      process.env.NODE_ENV === 'development'
        ? 'https://alpha.rabby.io/'
        : 'https://api.rabby.io'
  }),
  {
    ttl: 5000 // 5 seconds
  }
);

export const getTokenAuthorizedList = async (
  id: string,
  chain_id: string
): Promise<TokenApproval[]> => {
  const { data } = await api.get('/v1/user/token_authorized_list', {
    params: {
      id,
      chain_id
    }
  });

  return data;
};

export const getLostToken = async (id: string): Promise<LostToken[]> => {
  const { data } = await api.get('/claim/user_loss', {
    params: {
      id
    }
  });

  return data;
};

export const getClaimStatus = async (
  id: string
): Promise<{
  is_claimed: boolean;
  text: string;
}> => {
  const { data } = await api.get('/claim/user_claimed', {
    params: {
      id
    }
  });

  return data;
};

export const getUsedChainList = async (id: string): Promise<ServerChain[]> => {
  const { data } = await api.get('/v1/user/used_chain_list', {
    params: {
      id
    }
  });

  return data;
};

export const postClaim = async (
  id: string,
  signature: string
): Promise<{
  msg: string;
}> => {
  const { data } = await api.post('/claim/user_claim', {
    id,
    signature
  });

  return data;
};

export const getUserClaims = async (id: string): Promise<UserClaim[]> => {
  const { data } = await api.get('/claim/user_claim', {
    params: {
      id
    }
  });
  return data;
};
