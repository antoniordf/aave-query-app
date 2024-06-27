import { provider, requestAccount } from "./metamask.js";
import { ethers } from "ethers";

export default class Contract {
  constructor(network, config, abi) {
    this.network = network;
    this.config = config;
    this.abi = abi;
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
      this.contractAddress = config.contractAddress;

      this.AaveDataQuery = new ethers.Contract(
        this.contractAddress,
        this.contractABI,
        this.signer
      );

      this.account = await this.signer.getAddress();
      console.log("Connected account:", this.account);
    } else {
      console.error("Error initializing contract.");
    }
  }

  async getReserveData(asset) {
    try {
      const result = await this.AaveDataQuery.getReserveData(asset);
      return result;
    } catch (error) {
      console.error("Error fetching reserve data:", error);
      throw error;
    }
  }
}
