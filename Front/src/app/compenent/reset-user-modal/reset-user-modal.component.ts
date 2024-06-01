import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../model/user-info.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar

@Component({
  selector: 'app-reset-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Import ReactiveFormsModule here
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './reset-user-modal.component.html',
  styleUrl: './reset-user-modal.component.scss'
})
export class ResetUserModalComponent {

  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    public dialogRef: MatDialogRef<ResetUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo
  ) {
    this.editUserForm = this.fb.group({
      id: [data.id, Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const updatedUserInfo: UserInfo = {
        id: this.data.id,
        name: this.data.name,
        password: this.editUserForm.get('password')?.value,
        address: this.data.address,
        active: this.data.active,
        roles: this.data.roles
      };
      this.userService.resetUser(updatedUserInfo).subscribe(response => {
        console.log('User updated successfully');
        this.dialogRef.close(updatedUserInfo);
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      }, error => {
        console.error('Error updating user', error);
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

