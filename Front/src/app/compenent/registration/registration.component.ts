import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { DiplomaService } from '../../services/DiplomaService';
import Web3 from 'web3';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

import { ethers } from 'ethers';
@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, SidebarComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private http: HttpClient,
    private diplomaService: DiplomaService,

  ) {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', [Validators.required]],
      roles: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  async onSubmit(): Promise<void> {
    if (this.userForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };

      const userAddress = this.userForm.get('address')?.value;
      const userRole = this.userForm.get('roles')?.value;

      try {
        console.log('im here1');

        if (userRole === 'ROLE_USER') {
          console.log('im here');
          console.log(userAddress);
          await this.diplomaService.addUser(userAddress);
          this.snackBar.open('User updated successfully', 'Close', {
            duration: 3000, // Duration in milliseconds
          });

          console.log('User added to blockchain');
        } else {
          await this.diplomaService.addAdmin(userAddress);
          console.log('Admin added to blockchain');
        }

        this.http.post<any>('http://localhost:8080/auth/addNewUser', this.userForm.value, httpOptions).subscribe(
          response => {
            console.log('User added successfully:', response);
            this.userForm.reset(); // Reset the form after successful submission
 
          },
          error => {
            console.error('Error adding user:', error);
          }
        );
      } catch (error) {
        console.error(`Error adding ${userRole === 'ROLE_USER' ? 'user' : 'admin'} to blockchain:`, error);
      }
    } else {
      console.warn('Form is invalid');
    }
  }
}