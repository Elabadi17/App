// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../model/user-info.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/auth/users'; // Update with your API URL

  constructor(private http: HttpClient) { }

  updateUser(userInfo: UserInfo): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userInfo.id}/update`, userInfo);
  }

  resetUser(userInfo: UserInfo): Observable<any> {
    return this.http.post(`${this.apiUrl}/${userInfo.id}/changePassword`, userInfo);
  }
}
