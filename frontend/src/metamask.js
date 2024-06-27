import { ethers } from "ethers";

let provider;

async function requestAccount() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      provider = new ethers.providers.Web3Provider(window.ethereum);
    } catch (error) {
      console.error("Error requesting accounts:", error);
      alert(
        "An error occurred. Please try again or ensure your MetaMask is correctly configured."
      );
    }
  } else {
    alert("Please install MetaMask to use this dApp!");
  }
}

export { provider, requestAccount };
