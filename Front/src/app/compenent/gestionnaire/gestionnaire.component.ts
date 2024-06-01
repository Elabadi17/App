import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { ResetUserModalComponent } from '../reset-user-modal/reset-user-modal.component';

@Component({
  selector: 'app-gestionnaire',
  standalone: true,
  imports: [SidebarComponent, RegistrationComponent, CommonModule, MatButtonModule, MatIconModule], // Add MatButtonModule and MatIconModule to imports
  templateUrl: './gestionnaire.component.html',
  styleUrls: ['./gestionnaire.component.scss']
})
export class GestionnaireComponent implements OnInit {

  tableauUtilisateurs: any[] = [];

  constructor(private http: HttpClient, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUtilisateurs();
  }

  fetchUtilisateurs() {
    this.http.get<any[]>('http://localhost:8080/auth/users')
      .subscribe(
        (data) => {
          this.tableauUtilisateurs = data.filter(user => user.roles.includes('ROLE_USER'));
          console.log('Fetched utilisateurs:', this.tableauUtilisateurs);
        },
        (error) => {
          console.error('Error fetching utilisateurs:', error);
        }
      );
  }

  activateUser(id: number) {
    this.http.post<void>(`http://localhost:8080/auth/users/${id}/activate`, {})
      .subscribe(
        () => {
          this.updateUserStatus(id, 1);
          console.log(`User ${id} activated`);
        },
        (error) => {
          console.error(`Error activating user ${id}:`, error);
        }
      );
  }

  deactivateUser(id: number) {
    this.http.post<void>(`http://localhost:8080/auth/users/${id}/deactivate`, {})
      .subscribe(
        () => {
          this.updateUserStatus(id, 0);
          console.log(`User ${id} deactivated`);
        },
        (error) => {
          console.error(`Error deactivating user ${id}:`, error);
        }
      );
  }

  private updateUserStatus(id: number, status: number) {
    const user = this.tableauUtilisateurs.find(u => u.id === id);
    if (user) {
      user.active = status;
    }
  }

  openEditUserModal(user: any): void {
    const dialogRef = this.dialog.open(EditUserModalComponent, {
      width: '500px',
      height: '400px' ,
      data: { id: user.id, name: user.name, address: user.address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUtilisateurs();
      }
    });
  }

  openResetUserModal(user: any): void {
    const dialogRef = this.dialog.open(ResetUserModalComponent, {
      width: '500px',
      height: '400px' ,
      data: { id: user.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUtilisateurs();
      }
    });
  }

  
}
