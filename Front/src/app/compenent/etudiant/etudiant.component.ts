import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [SidebarComponent,RegistrationComponent,CommonModule,],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.scss'
})
export class EtudiantComponent {

  etudiants: any[] = [];

  constructor(private http: HttpClient,private router: Router) { } // Inject HttpClient

  ngOnInit(): void {
    this.fetchUtilisateurs(); // Call fetchUtilisateurs() when component initializes
  }

  fetchUtilisateurs() {
    this.http.get<any[]>('http://localhost:8080/etudiants')
      .subscribe(
        (data) => {
          this.etudiants = data; // Assign fetched data to tableauUtilisateurs
          console.log(data);
        },
        (error) => {
          console.error('Error fetching utilisateurs:', error);
        }
      );
  }

  voirDetailsEtudiant(metadataHash: string) {
    this.router.navigate(['/dashboard/etudiant-info', metadataHash]);
  }
 
}
