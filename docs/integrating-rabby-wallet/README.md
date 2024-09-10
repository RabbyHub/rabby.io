# Integrating Rabby Wallet

This guide will help Dapp developers understand how to integrate Rabby wallet into their applications. We'll cover several main connection methods, including pure JavaScript, Wagmi, and Ethers.js, as well as other third-party wallet connection libraries that support Rabby wallet.

## Table of Contents

1. [Connecting Rabby Wallet Using Pure JavaScript](#pure-javascript)
2. [Connecting Rabby Wallet Using Wagmi](#wagmi)
3. [Connecting Rabby Wallet Using Ethers.js](#ethers-js)
4. [Other Third-Party Wallet Connection Libraries](#other-libraries)

<a name="pure-javascript"></a>

## 1. Connecting Rabby Wallet Using Pure JavaScript

### 1.1 Connecting Using EIP-6963

EIP-6963 provides a new method to handle situations with multiple wallet providers. This approach allows multiple wallets to coexist and provides users with a better selection experience. Here's how to connect to Rabby wallet using EIP-6963:

```js
async function connectWithEIP6963() {
  if (typeof window.ethereum === "undefined") {
    console.error("No EIP-1193 wallet detected");
    return;
  }

  // Define event listener
  function handleEIP6963Announce(event) {
    const { info, provider } = event.detail;
    console.log(`Detected wallet: ${info.name}`);

    // If it's Rabby wallet, connect
    if (info.rdns === "io.rabby") {
      connectToWallet(provider);
    }
  }

  // Add event listener
  window.addEventListener("eip6963:announceProvider", handleEIP6963Announce);

  // Request wallet announcement
  window.dispatchEvent(new Event("eip6963:requestProvider"));

  // Function to connect to wallet
  async function connectToWallet(provider) {
    try {
      const accounts = await provider.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected to Rabby. Account:", accounts[0]);
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  }
}
```

Using this method, your Dapp can better handle multi-wallet environments. It allows Rabby wallet (and other wallets supporting EIP-6963) to announce their presence to your application, then you can choose to connect to Rabby wallet.

### 1.2 Connecting Using window.ethereum

This method relies on the `window.ethereum` object. Here are the basic steps:

```js
async function connectRabbyWallet() {
  if (window.ethereum && window.ethereum.isRabby) {
    try {
      // Request user authorization
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected account:", accounts[0]);
    } catch (error) {
      console.error("Failed to connect to Rabby wallet:", error);
    }
  } else {
    console.error("Rabby wallet is not installed");
  }
}
```

<a name="wagmi"></a>

## 2. Connecting Rabby Wallet Using Wagmi

[Wagmi](https://wagmi.sh/) is a popular React Hooks library for Ethereum. Here's how to use Wagmi to connect to Rabby wallet:

First, install the necessary dependencies:

```bash
npm install wagmi viem@2.x @tanstack/react-query
```

Create and export a `wagmi` configuration using `createConfig`:

```js
import { http, createConfig } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
```

Then, in your React application:

```jsx
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "./config";

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/** ... */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

Connecting through wagmi:

```jsx
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

function RabbyConnect() {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  if (isConnected)
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  return <button onClick={() => connect()}>Connect Rabby Wallet</button>;
}
```

<a name="ethers-js"></a>

## 3. Connecting Rabby Wallet Using Ethers.js

[Ethers.js](https://docs.ethers.org/v5/) is another popular Ethereum library. Here's how to use Ethers.js to connect to Rabby wallet:

First, install Ethers.js:

```bash
npm install ethers@5
```

Then, you can use the following code to connect to Rabby wallet:

```javascript
import { ethers } from "ethers";

async function connectRabbyWithEthers() {
  if (window.ethereum && window.ethereum.isRabby) {
    try {
      // Request user authorization
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create Web3Provider instance
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Get signer
      const signer = provider.getSigner();

      // Get address
      const address = await signer.getAddress();
      console.log("Connected account:", address);

      // You can now use provider and signer for further operations
    } catch (error) {
      console.error("Failed to connect to Rabby wallet:", error);
    }
  } else {
    console.error("Rabby wallet is not installed");
  }
}
```

<a name="other-libraries"></a>

## 4. Other Third-Party Wallet Connection Libraries

In addition to the above methods, there are several popular third-party wallet connection libraries that also support Rabby wallet integration. These libraries typically provide simpler APIs and ready-made UI components, which can simplify the wallet connection process. Here are some commonly used libraries:

- [RainbowKit](https://www.rainbowkit.com/)

- [ConnectKit](https://docs.family.co/connectkit)

- [AppKit](https://walletconnect.com/appkit)

- [Web3-Onboard](https://onboard.blocknative.com/)

All of these libraries support Rabby wallet and provide detailed documentation and examples. You can choose a suitable library based on your project requirements and refer to their official documentation for integration.
