import logo from './logo.svg';
import './App.css';
import DepositButton from './components/depositButton';
import WithdrawButton from './components/withdrawButton';

function App() {
  return (
    <div className="App">
      <DepositButton/>
      <hr/><hr/>
      <WithdrawButton/>
    </div>
  );
}

export default App;
