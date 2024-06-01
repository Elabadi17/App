import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

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
import { DiplomaModalComponent } from '../diploma-modal/diploma-modal.component';
@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './verify.component.html',
  styleUrl: './verify.component.scss'
})
export class VerifyComponent {
  diplomaId: string = '';
  nom: string = '';
  prenom: string = '';
  email: string = '';
  promo: string = '';
  verificationResult: boolean | null = null;
  errorMessage: string = '';

  constructor(private diplomaService: DiplomaService, public dialog: MatDialog) {}

  async verifyDiploma() {
    try {
      this.verificationResult = await this.diplomaService.verifyDiploma(
        this.diplomaId,
        this.nom,
        this.prenom,
        this.email,
        this.promo
      );
      this.errorMessage = '';
      if (this.verificationResult) {
        this.fetchDiplomaDetails();
      }
    } catch (error) {
      console.error('Error verifying diploma:', error);
      this.verificationResult = null;
      this.errorMessage = 'Error verifying diploma. Please try again.';
    }
  }

  async fetchDiplomaDetails() {
    try {
      const diplomaData = await this.diplomaService.getDiploma(this.diplomaId);
      this.openDialog(diplomaData);
    } catch (error) {
      console.error('Error fetching diploma details:', error);
      this.errorMessage = 'Error fetching diploma details. Please try again.';
    }
  }

  openDialog(diplomaData: any): void {
    const dialogRef = this.dialog.open(DiplomaModalComponent, {
      width: '250px',
      data: diplomaData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}