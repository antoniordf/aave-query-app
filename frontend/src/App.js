import React, { useEffect, useState } from "react";
import Contract from "./contract";
import config from "./config.json";
import AaveDataQuery from "./AaveDataQuery.json";

function App() {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    async function initContract() {
      const contract = new Contract("sepolia", config, AaveDataQuery.abi);
      await contract.initialize("sepolia");
      setContract(contract);
    }

    initContract();
  }, []);

  const handleRequestData = async () => {
    const asset = document.getElementById("asset").value;
    console.log("Asset entered", asset);

    const assetAddress = config.assets[asset];
    console.log("Asset address", assetAddress);

    try {
      const result = await contract.getReserveData(assetAddress);
      console.log("Result", result);
      displayResult(result);
    } catch (error) {
      console.error("Error fetching reserve data:", error);
    }
  };

  const displayResult = (result) => {
    const resultDisplay = document.getElementById("resultDisplay");
    resultDisplay.innerHTML = `
      <h2>Reserve Data</h2>
      <p>Unbacked: ${result.unbacked}</p>
      <p>Accrued to Treasury Scaled: ${result.accruedToTreasuryScaled}</p>
      <p>Total AToken: ${result.totalAToken}</p>
      <p>Total Stable Debt: ${result.totalStableDebt}</p>
      <p>Total Variable Debt: ${result.totalVariableDebt}</p>
      <p>Liquidity Rate: ${result.liquidityRate}</p>
      <p>Variable Borrow Rate: ${result.variableBorrowRate}</p>
      <p>Stable Borrow Rate: ${result.stableBorrowRate}</p>
      <p>Average Stable Borrow Rate: ${result.averageStableBorrowRate}</p>
      <p>Liquidity Index: ${result.liquidityIndex}</p>
      <p>Variable Borrow Index: ${result.variableBorrowIndex}</p>
      <p>Last Update Timestamp: ${result.lastUpdateTimestamp}</p>
    `;
  };

  return (
    <div className="App">
      <h1>AAVE Data Request</h1>
      <input type="text" id="asset" placeholder="Enter asset name" />
      <button
        id="requestDataButton"
        onClick={handleRequestData}
        disabled={!contract}
      >
        Request Data
      </button>
      <div id="resultDisplay"></div>
    </div>
  );
}

export default App;
