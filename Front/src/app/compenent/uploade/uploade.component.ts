import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IpfsService } from '../../services/Storage/IpfsService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-uploade',
  standalone: true,
  imports: [SidebarComponent,RegistrationComponent,CommonModule,FormsModule,],
  templateUrl: './uploade.component.html',
  styleUrl: './uploade.component.scss',
})
export class FormulaireEtudiantComponent {
  etudiant = {
    nom: '',
    prenom: '',
    filiere: '',
    promo: '',
    email: '',
    institut: '',
    diplome: null // This will store the selected file
  };

  constructor(private ipfsService: IpfsService,private formBuilder: FormBuilder,private http: HttpClient) {}

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
      const ipfsMetadataHash = await this.ipfsService.uploadToIpfs(file);
      console.log('Metadata file uploaded to IPFS. Hash:', ipfsMetadataHash);
      const formData = {
        nom: this.etudiant.nom,
        metadataHash: ipfsMetadataHash
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    console.log(formData);
    this.http.post('http://localhost:8080/enregistrer-metadata', formData,httpOptions).subscribe(
        () => {
            console.log('Données enregistrées avec succès');
        },
        (error) => {
            console.error('Erreur lors de l\'enregistrement des données:', error);
        }
    );
      // You can now use ipfsMetadataHash and ipfsDiplomeHash to save this information to your database or for other necessary actions
    } catch (error) {
      console.error('Error uploading files to IPFS:', error);
      // Display an error message to the user
    }
  }
}