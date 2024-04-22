import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [SidebarComponent,RegistrationComponent,CommonModule,],
  templateUrl: './gestionnaire.component.html',
  styleUrl: './gestionnaire.component.scss'
})
export class GestionnaireComponent {

  tableauUtilisateurs: any[] = [];

  constructor(private http: HttpClient) { } // Inject HttpClient

  ngOnInit(): void {
    this.fetchUtilisateurs(); // Call fetchUtilisateurs() when component initializes
  }

  fetchUtilisateurs() {
    this.http.get<any[]>('http://localhost:8080/auth/Users')
      .subscribe(
        (data) => {
          this.tableauUtilisateurs = data; // Assign fetched data to tableauUtilisateurs
          console.log(data);
        },
        (error) => {
          console.error('Error fetching utilisateurs:', error);
        }
      );
  }
}