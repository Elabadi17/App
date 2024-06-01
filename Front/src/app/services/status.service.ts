import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private apiUrl = 'http://localhost:8080/auth/users';

  constructor(private http: HttpClient) { }

  deactivateUser(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/deactivate`, {});
  }

  activateUser(id: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/activate`, {});
  }
}
