import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Diplome } from '../model/diplome.model';

@Injectable({
  providedIn: 'root'
})
export class DiplomeService {
  private apiUrl = 'YOUR_API_URL'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAllDiplomes(): Observable<Diplome[]> {
    return this.http.get<Diplome[]>(this.apiUrl + '/diplomes');
  }

  verifyDiplome(diplomeHash: string): Observable<boolean> {
    // Implémentez la logique de vérification ici
    // Vous pouvez vérifier le diplôme en consultant la blockchain ou toute autre source de données
    // Dans cet exemple, nous retournons simplement une valeur aléatoire pour simuler la vérification
    return new Observable<boolean>(observer => {
      setTimeout(() => {
        const isVerified = Math.random() >= 0.5; // Simulation d'une vérification aléatoire
        observer.next(isVerified);
      }, 1000); // Délai de 1 seconde pour simuler une vérification asynchrone
    });
  }
}
