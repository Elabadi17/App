import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class IpfsService {
  private readonly pinataApiKey = '3faac67c363e72ba1eca';
  private readonly pinataSecretApiKey = 'c1b400f70eb320f5152440bc86d73937f09431b327fd6d96172fd7d7b2aaf0c9';

  constructor() { }

  async uploadToIpfs(file: File): Promise<string> {
    const url = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'pinata_api_key': this.pinataApiKey,
        'pinata_secret_api_key': this.pinataSecretApiKey,
      }
    });

    return response.data.IpfsHash;
  }

  async uploadJsonToIpfs(json: string, filename: string): Promise<string> {
    const url = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

    const response = await axios.post(url, json, {
      params: {
        pinataMetadata: JSON.stringify({
          name: filename // Include filename in metadata
        })
      },
      headers: {
        'Content-Type': 'application/json',
        'pinata_api_key': this.pinataApiKey,
        'pinata_secret_api_key': this.pinataSecretApiKey,
      }
    });

    return response.data.IpfsHash;
  }
}