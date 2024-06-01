import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-diploma-modal',
  templateUrl: './diploma-modal.component.html',
  styleUrls: ['./diploma-modal.component.scss']
})
export class DiplomaModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DiplomaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onDownloadClick(): void {
    const imageUrl = `https://ipfs.io/ipfs/${this.data.ipfsHash}`;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.target = '_blank'; // Open the link in a new tab/window
    link.setAttribute('download', 'diploma-image.jpg');
    link.click();
  }

  get imageUrl(): string {
    return `https://ipfs.io/ipfs/${this.data.ipfsHash}`;
  }
}
