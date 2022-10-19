import { WagmiConfig, createClient, useAccount } from 'wagmi';
import { HomeLayout } from '../components/HomeLayout';
import { getDefaultProvider } from 'ethers';
import Head from 'next/head';
import React from 'react';
import { BASE_PATH } from '../utils/env';

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider()
});

const Home = () => {
  return (
    <WagmiConfig client={client}>
      <Head>
        <title>Rabby</title>
        <meta name="description" content="A browser plugin for DeFi users" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={`${BASE_PATH}/favicon.png`} />
      </Head>
      <HomeLayout />
    </WagmiConfig>
  );
};

export default Home;
