import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IpfsService } from '../../services/Storage/IpfsService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockchainService } from '../../services/BlockchainService';
import { DiplomaService } from '../../services/DiplomaService';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { toString as uint8ArrayToString } from 'uint8arrays/to-string';
import { CID } from 'multiformats/cid';
import { base58btc } from 'multiformats/bases/base58';
import { Buffer } from 'buffer'; // Import Buffer from buffer

@Component({
  selector: 'app-uploade',
  standalone: true,
  imports: [SidebarComponent,RegistrationComponent,CommonModule,FormsModule,],
  templateUrl: './uploade.component.html',
  styleUrl: './uploade.component.scss',
})
export class FormulaireEtudiantComponent {
  etudiant = {
    address: '',
    nom: '',
    prenom: '',
    filiere: '',
    promo: '',
    email: '',
    institut: '',
    diplome: null // This will store the selected file
  };

  constructor(private ipfsService: IpfsService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private formBuilder: FormBuilder,private http: HttpClient,       private diplomaService: DiplomaService,

  ) {}

  onFileSelected(event: any) {
    this.etudiant.diplome = event.target.files[0];
  }

  async submitForm() {
    try {
      // Upload diploma image to IPFS
      if (!this.etudiant.diplome) {
        // Handle case where no file is selected
        return;
      }
      const ipfsDiplomeHash = await this.ipfsService.uploadToIpfs(this.etudiant.diplome);
      console.log('Diploma image uploaded to IPFS. Hash:', ipfsDiplomeHash);

      // Create metadata including the diploma hash
      const metadata = {
        nom: this.etudiant.nom,
        prenom: this.etudiant.prenom,
        filiere: this.etudiant.filiere,
        promo: this.etudiant.promo,
        email: this.etudiant.email,
        institut: this.etudiant.institut,
        diplomeHash: ipfsDiplomeHash // Include the diploma hash in metadata
      };
      const metadataText = JSON.stringify(metadata, null, 2);
      const metadataFileName = `${this.etudiant.nom}_${this.etudiant.prenom}_metadata.txt`;
      const blob = new Blob([metadataText], { type: 'text/plain' });
      const file = new File([blob], metadataFileName, { type: 'text/plain' });

      // Upload metadata file to IPFS
      //const ipfsMetadataHash = await this.ipfsService.uploadToIpfs(file);
      //console.log('Metadata file uploaded to IPFS. Hash:', ipfsMetadataHash);
      /*const formData = {
        nom: this.etudiant.nom,
        metadataHash: ipfsMetadataHash
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(formData);
    console.log(this.etudiant.address,
      this.etudiant.nom,
      this.etudiant.prenom,
      this.etudiant.nom,
      this.etudiant.prenom,
      this.etudiant.filiere,
      this.etudiant.promo,
      this.etudiant.email,
      this.etudiant.institut,
      ipfsMetadataHash)
       // Convert IPFS hash to bytes32 format
       const cid = CID.parse(ipfsMetadataHash);
       const ipfsHashBytes32 = '0x' + Buffer.from(cid.multihash.bytes).toString('hex').slice(4, 68);
 */
        // Upload metadata hash to blockchain
        try {
          const blockchainResponse = await this.diplomaService.addDiploma(
            this.etudiant.address,
            this.etudiant.nom,
            this.etudiant.prenom,
            this.etudiant.filiere,
            this.etudiant.promo,
            this.etudiant.email,
            this.etudiant.institut,
            ipfsDiplomeHash
          );
          console.log('Metadata hash uploaded to blockchain:', blockchainResponse);
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 3000, // Duration in milliseconds
          });
          this.etudiant = {
            address: '',
            nom: '',
            prenom: '',
            filiere: '',
            promo: '',
            email: '',
            institut: '',
            diplome: null
          };
        } catch (error) {
          console.error('Error uploading metadata to blockchain:', error);
        }
 

  } catch (error) {
    console.error('Error uploading files to IPFS:', error);
  }
}


}