
import './App.css';
import DepositButton from './components/depositButton';
import WithdrawButton from './components/withdrawButton';
import { useEffect, useState } from "react";

function App() {

  const [hasMetaMask, setHasMetaMask] = useState(false);
  useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      setHasMetaMask(true);
    }
  });

  return (
    <div className="App">
      {hasMetaMask ? <div>
        <DepositButton />
        <hr />
        <hr />
        <WithdrawButton />
      </div>
        : "Please install MetaMask"}
    </div>
  );
}

export default App;
