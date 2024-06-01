import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { DiplomaService } from '../../services/DiplomaService'; // Ensure the correct path
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [SidebarComponent, RegistrationComponent, CommonModule],
  templateUrl: './etudiant.component.html',
  styleUrls: ['./etudiant.component.scss']
})
export class EtudiantComponent implements OnInit {
  students: { address: string; name: string }[] = [];

  constructor(private diplomaService: DiplomaService, private router: Router) { }

  ngOnInit(): void {
    this.fetchStudentData();
  }

  fetchStudentData(): void {
    this.diplomaService.getAllDiplomaIdsWithStudentName().then((data: { addresses: string[], names: string[] }) => {
      this.students = data.addresses.map((address, index) => ({
        address,
        name: data.names[index]
      }));
    }).catch((error: any) => {
      console.error('Error fetching student data:', error);
    });
  }
  navigateToDetails(address: string): void {
    this.router.navigate(['dashboard/etudiant-info', address]);
  }
}
