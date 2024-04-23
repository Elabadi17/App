import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface EtudiantDetails {
  nom: string;
  prenom: string;
  filiere: string;
  promo: string;
  email: string;
  institut: string;
  diplomeHash: string;
}

@Component({
  selector: 'app-etudiant-info',
  standalone: true,
  imports: [SidebarComponent,RegistrationComponent,CommonModule,],
  templateUrl: './etudiant-info.component.html',
  styleUrl: './etudiant-info.component.scss'
})
export class EtudiantInfoComponent {
  data: EtudiantDetails = { // Initialisez data avec un objet vide ou des valeurs par défaut
    nom: '',
    prenom: '',
    filiere: '',
    promo: '',
    email: '',
    institut: '',
    diplomeHash: ''
  };

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Récupérer le metadataHash de l'URL
    const metadataHash = this.route.snapshot.paramMap.get('metadataHash');
    if (metadataHash) {
      // Appeler fetchData() avec le metadataHash récupéré
      this.fetchData(metadataHash);
    }
  }

  fetchData(metadataHash: string) {
    // Utiliser les backticks (`) pour créer une chaîne de caractères de modèle
    const url = `https://cloudflare-ipfs.com/ipfs/${metadataHash}`;

    this.http.get<EtudiantDetails>(url)
      .subscribe(
        (data) => {
          this.data = data; // Assigner les données récupérées
          console.log(data);
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
      );
  }
}