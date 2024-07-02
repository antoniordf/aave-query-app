import { provider, requestAccount } from "./metamask.js";
import { ethers } from "ethers";

export default class Contract {
  constructor(network, config, abi, aaveAbi) {
    this.network = network;
    this.config = config;
    this.abi = abi;
    this.aaveAbi = aaveAbi;
    this.initialize(network);
  }

  async initialize(network) {
    const config = this.config[network];
    if (!config) {
      console.error(`No configuration found for network: ${network}`);
      return;
    }

    await requestAccount();

    if (provider) {
      this.signer = provider.getSigner();
      this.contractABI = this.abi;
      this.aaveContractABI = this.aaveAbi;
      this.contractAddress = config.contractAddress;
      this.aaveContractAddress = config.aaveContractAddress;

      // This is used to send transactions that modify the contract.
      this.AaveDataQuery = new ethers.Contract(
        this.contractAddress,
        this.contractABI,
        this.signer
      );

      // This is used for read only operations.
      this.AaveContract = new ethers.Contract(
        this.aaveContractAddress,
        this.aaveContractABI,
        provider
      );

      this.account = await this.signer.address;
      console.log("Connected account:", this.account);
    } else {
      console.error("Error initializing contract.");
    }
  }

  async getReserveData(asset) {
    try {
      const result = await this.AaveContract.getReserveData(asset);
      return result;
    } catch (error) {
      console.error("Error fetching reserve data:", error);
      throw error;
    }
  }
}
