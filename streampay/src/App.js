import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';
import { formatBalance, formatChainAsNum} from './utils/unitsconvertor';
export const App = () => {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId ,balance} = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      console.log(accounts)
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
  };

  return (
    <div className="App">
      <button style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect
      </button>
      {connected && (
        <div>
          <>
            {chainId && `Connected chain: ${formatBalance(balance)}`}
            <p></p>

            {chainId && `Connected chain: ${formatChainAsNum(chainId)}`}
            <p></p>
            {account && `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};
export default App;
