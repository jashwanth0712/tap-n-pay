import { useSDK } from '@metamask/sdk-react';
import React, { useState } from 'react';
import "./App.css"
import { formatBalance, formatChainAsNum , sliceString} from './utils/unitsconvertor';
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
      {account?
      <button  className="button-34" disabled={connected}style={{ padding: 10, margin: 10 }} onClick={connect}>
      {sliceString(account)}
    </button>
    : 
    <button className="button-34" style={{ padding: 10, margin: 10 }} onClick={connect}>
        Connect wallet
      </button>
       
    }
      {connected && (
        <div>
          <>
            {`balance: ${formatBalance(balance)}`}
            <p></p>

            { `Connected chain: ${formatChainAsNum(chainId)}`}
            <p></p>
            { `Connected account: ${account}`}
          </>
        </div>
      )}
    </div>
  );
};
export default App;
