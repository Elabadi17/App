import { Injectable } from '@angular/core';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { Contract, ContractInterface } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {
  private web3: Web3;
  private provider: ethers.providers.Web3Provider;
  private contract: Contract;
  private contractAddress = '0x938F07f410BA7a83E585bcA1c2ce9b6928658D9e'; // Replace with your contract address
  private contractABI: ContractInterface = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_diplomeHash",
          "type": "string"
        }
      ],
      "name": "getDiplomaByHash",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "nom",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "prenom",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "filiere",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "promo",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "email",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "institut",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "diplomeHash",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "metadataHash",
              "type": "string"
            }
          ],
          "internalType": "struct DiplomaRegistry.Diploma",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_nom",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_prenom",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_filiere",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_promo",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_institut",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_diplomeHash",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_metadataHash",
          "type": "string"
        }
      ],
      "name": "uploadMetadata",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  constructor() {
    console.log('Initializing BlockchainService');
    this.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')); // Replace with your Ganache URL
    console.log('Web3 provider:', this.web3.currentProvider);
    this.provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log('Ethers provider:', this.provider);
    this.contract = new ethers.Contract(this.contractAddress, this.contractABI, this.provider);
    console.log('Contract initialized:', this.contract);
    this.initialize();
  }

  private async initialize() {
    try {
      console.log('Requesting account access...');
      await this.provider.send("eth_requestAccounts", []);
      const signer = this.provider.getSigner();
      console.log('Signer:', await signer.getAddress());
      this.contract = this.contract.connect(signer);
      console.log('Contract with signer:', this.contract);
    } catch (error) {
      console.error('Error during initialization:', error);
    }
  }

  async uploadMetadataToBlockchain(
    nom: string,
    prenom: string,
    filiere: string,
    promo: string,
    email: string,
    institut: string,
    diplomeHash: string,
    metadataHash: string
  ): Promise<any> {
    try {
      console.log('Uploading metadata...');
      return await this.contract['uploadMetadata'](
        nom,
        prenom,
        filiere,
        promo,
        email,
        institut,
        diplomeHash,
        metadataHash
      );
    } catch (error) {
      console.error('Error uploading metadata:', error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }

  async getDiplomaByHash(diplomeHash: string): Promise<any> {
    try {
      return await this.contract['getDiplomaByHash'](diplomeHash);
    } catch (error) {
      console.error('Error getting diploma by hash:', error);
      throw error; // Rethrow the error for handling in the calling code
    }
  }
}
