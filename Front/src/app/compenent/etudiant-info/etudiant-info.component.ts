import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { DiplomaService } from '../../services/DiplomaService'; // Ensure the correct path
import { ActivatedRoute } from '@angular/router';
import {EmailService} from '../../services/email.service' 
interface EtudiantDetails {
  nom: string;
  prenom: string;
  fillier: string;
  promo: string;
  email: string;
  institut: string;
  ipfsHash: string;
  owner: string;
  DiplomaId: string;
}

@Component({
  selector: 'app-etudiant-info',
  standalone: true,
  imports: [SidebarComponent, RegistrationComponent, CommonModule],
  templateUrl: './etudiant-info.component.html',
  styleUrls: ['./etudiant-info.component.scss']
})
export class EtudiantInfoComponent implements OnInit {
  data: EtudiantDetails = {
    nom: '',
    prenom: '',
    fillier: '',
    promo: '',
    email: '',
    institut: '',
    ipfsHash: '',
    owner: '',
    DiplomaId: ''
  };

  constructor(
    private diplomaService: DiplomaService,
    private route: ActivatedRoute,
    private emailService: EmailService
  ) { }

  ngOnInit(): void {
    const diplomaId = this.route.snapshot.paramMap.get('id');
    if (diplomaId) {
      this.fetchStudentData(diplomaId);
    }
  }

  fetchStudentData(diplomaId: string): void {
    this.diplomaService.getDiploma(diplomaId).then((data: EtudiantDetails) => {
      this.data = data;
    }).catch((error: any) => {
      console.error('Error fetching student data:', error);
    });
  }
  sendEmail() {
    const subject = 'Your Diploma has been uploaded on EduCertify';
    const body = `Dear ${this.data.nom} ${this.data.prenom},
                  <br><br>
                  We are pleased to inform you that your diploma has been successfully uploaded on the EduCertify platform.
                  <br><br>
                  Diploma ID: ${this.data.DiplomaId}
                  <br><br>
                  Best regards,
                  <br>
                  EduCertify Team`;
    
    this.emailService.sendEmail(this.data.email, subject, body)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Mail sent successfully');
      })
      .catch((error) => {
        console.error('FAILED...', error);
        alert('Failed to send mail: ' + error);
      });
  }
}