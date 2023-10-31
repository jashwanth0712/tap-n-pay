import React, { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { formatBalance, formatChainAsNum, sliceString } from './utils/unitsconvertor';
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import CircularInputField from './components/circularinput';
import "./App.css";
import QRcodeComponent from './components/qrgenerator';
import QrcodeScanner from './components/qrscanner';
async function createNewFlow(recipient, flowRate , provider , chainId) {
  await provider.request("eth_requestAccounts", []);

  const signer = provider.getSigner();

  const sf = await Framework.create({
    chainId: Number(chainId),
    provider: provider
  });

  const superSigner = sf.createSigner({ signer: signer });

  console.log(signer);
  console.log(await superSigner.getAddress());
  const daix = await sf.loadSuperToken("MATICx");

  console.log(daix);

  try {
    const createFlowOperation = daix.createFlow({
      sender: await superSigner.getAddress(),
      receiver: recipient,
      flowRate: flowRate
      // userData?: string
    });

    console.log(createFlowOperation);
    console.log("Creating your stream...");

    const result = await createFlowOperation.exec(superSigner);
    console.log(result);

    console.log(
      `Congrats - you've just created a money stream!
    `
    );
  } catch (error) {
    console.log(
      "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
    );
    console.error(error);
  }
}
export const App = () => {
  const [amount,setamount]=useState(0);
  const [qrdata,setqrdata]=useState()
  const [account, setAccount] = useState();
  const [recipient, setRecipient] = useState(""); // State to store the recipient address
  const [flowRate, setFlowRate] = useState(""); // State to store the flow rate
  const { sdk, connected, provider, chainId, balance } = useSDK();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch (err) {
      console.warn("Failed to connect:", err);
    }
  };
  const handleAmountChange = (e) => {
    const valueWithG = e.target.value;
    const valueWithoutG = valueWithG.replace('G$', ''); // Remove 'G$' from the input
    const numericValue = parseFloat(valueWithoutG);
  
    if (!isNaN(numericValue)) {
      setamount(numericValue); // Update the state with the numeric value
    } else {
      // Handle the case where the input does not contain a valid numeric value
    }
  };
  
  const handleCreateFlow = async () => {
    if (recipient && flowRate) {
      try {
        console.log(recipient, flowRate, provider, chainId ,account)
        await createNewFlow(recipient, flowRate, provider, chainId );
      } catch (error) {
        console.error("Error creating flow:", error);
      }
    } else {
      console.warn("Recipient and flow rate are required.");
    }
  };
  const handleIncrement = (value) => {
    console.log("got ",value)
    setamount((value*100).toFixed(2));
  };
  return (
    <div className="App">
      {account ? (
        <button className="button-34" disabled={connected} style={{ margin: 10 }} onClick={connect}>
          {sliceString(account)}
        </button>
      ) : (
        <button className="button-34" style={{ margin: 10 }} onClick={connect}>
          Connect wallet
        </button>
      )}
      <QRcodeComponent value="jashwanth,hi,howareyou"/>
      <h1>{qrdata}</h1>
    <QrcodeScanner setqrdata={setqrdata}/>
      {connected && (
        <div>
          <>
            {`Balance: ${formatBalance(balance)}`}
            <p></p>
            {`Connected chain: ${formatChainAsNum(chainId)}`}
            <p></p>
            {`Connected account: ${account}`}
          </>
          <div>
            <input
              type="text"
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <input
              type="text"
              placeholder="Flow Rate"
              value={flowRate}
              onChange={(e) => setFlowRate(e.target.value)}
            />
            <button onClick={handleCreateFlow}>Create Flow</button>
          </div>
        </div>
      )}
      <div class="container">
      <div className='inputfield'>
    <input
      type="text"
      value={amount + "G$"}
      onChange={handleAmountChange}
      class="centered-input"
    />
  <p className='comment'>per min</p>
</div>

  <CircularInputField updateValue={handleIncrement} initialvalue={amount / 100} class="full-width-circular-input" />
</div>
    </div>
  );
};

export default App;

