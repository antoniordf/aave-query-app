import React, { useEffect, useState } from "react";
import Contract from "./contract";
import config from "../public/config.json";
import AaveDataQuery from "../../out/AaveDataQuery.sol/AaveDataQuery.json";

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function initContract() {
      const contract = new Contract("sepolia", config, AaveDataQuery);
      await contract.initialize("sepolia");
      setContract(contract);
    }

    initContract();
  }, []);

  return (
    <div className="App">
      <h1>AAVE Data Request</h1>
      <input type="text" id="asset" placeholder="Enter asset name" />
      <button id="requestDataButton" disabled={!contract}>
        Request Data
      </button>
      <div id="resultDisplay"></div>
    </div>
  );
}

export default App;
