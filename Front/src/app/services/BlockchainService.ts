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
  private contractAddress ='0xD1f0d17D48565B948843A75Ee077bf6FEACdF65a'; // Replace with your contract address
  private contractABI: ContractInterface = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "AdminAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "AdminRemoved",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "bytes32",
          "name": "diplomaId",
          "type": "bytes32"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "nom",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "prenom",
          "type": "string"
        }
      ],
      "name": "DiplomaAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "UserAdded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "UserRemoved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newAdmin",
          "type": "address"
        }
      ],
      "name": "addAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_owner",
          "type": "address"
        },
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
          "name": "_fillier",
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
          "name": "_ipfsHash",
          "type": "string"
        }
      ],
      "name": "addDiploma",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newUser",
          "type": "address"
        }
      ],
      "name": "addUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "diplomas",
      "outputs": [
        {
          "internalType": "bytes32",
          "name": "DiplomaId",
          "type": "bytes32"
        },
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
          "name": "fillier",
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
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "ipfsHash",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "diplomasCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllDiplomaIdsWithStudentName",
      "outputs": [
        {
          "internalType": "string[]",
          "name": "",
          "type": "string[]"
        },
        {
          "internalType": "bytes32[]",
          "name": "",
          "type": "bytes32[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_DiplomaId",
          "type": "bytes32"
        }
      ],
      "name": "getDiploma",
      "outputs": [
        {
          "components": [
            {
              "internalType": "bytes32",
              "name": "DiplomaId",
              "type": "bytes32"
            },
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
              "name": "fillier",
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
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "ipfsHash",
              "type": "string"
            }
          ],
          "internalType": "struct diplome.Diploma",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getNumberOfDiplomas",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "admin",
          "type": "address"
        }
      ],
      "name": "removeAdmin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "user",
          "type": "address"
        }
      ],
      "name": "removeUser",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "_DiplomaId",
          "type": "bytes32"
        },
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
          "name": "_email",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_promo",
          "type": "string"
        }
      ],
      "name": "verifyDiploma",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
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