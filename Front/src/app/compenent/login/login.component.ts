import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule here,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  {
  userForm: FormGroup;


  constructor(private auth: AuthService,    private snackBar: MatSnackBar,    private router: Router,private formBuilder: FormBuilder, private http: HttpClient) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post<any>('http://localhost:8080/auth/generateToken', this.userForm.value,httpOptions).subscribe(
        response => {
          console.log('User authenticated successfully:', response);


          this.auth.saveToken(response.token);
         if(this.auth.isUser()){
          this.auth.isUserActive().subscribe(isActive => {
            if (!isActive) {
              localStorage.removeItem('token');
              this.snackBar.open('Your account is inactive', 'Close', {
                duration: 3000,
              });
            } else {
              // Redirect to the dashboard
              this.router.navigate(['/dashboard']);
            }
          }, error => {
            console.error('Error checking user activity', error);
          });
         } else {              this.router.navigate(['/dashboard']);
        }
        
      },
      error => {
        console.error('Error authenticating user:', error);
        // Handle error here
      }
    );
  }
  }}