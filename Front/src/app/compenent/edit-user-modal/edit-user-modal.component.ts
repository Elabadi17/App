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
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule, // Import ReactiveFormsModule here
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar, // Inject MatSnackBar
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserInfo
  ) {
    this.editUserForm = this.fb.group({
      name: [data.name, Validators.required],
      id: [data.id, Validators.required],
      address: [data.address, Validators.required]
    });
  }

  onSubmit() {
    if (this.editUserForm.valid) {
      const updatedUserInfo: UserInfo = {
        id: this.data.id,
        name: this.editUserForm.get('name')?.value,
        password: this.editUserForm.get('password')?.value,
        address: this.editUserForm.get('address')?.value,
        active: this.data.active,
        roles: this.data.roles
      };
      this.userService.updateUser(updatedUserInfo).subscribe(response => {
        console.log('User updated successfully');
        this.dialogRef.close(updatedUserInfo);
        this.snackBar.open('User updated successfully', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      }, error => {
        console.error('Error updating user', error);
        this.snackBar.open('Erreur', 'Close', {
          duration: 3000, // Duration in milliseconds
        });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
