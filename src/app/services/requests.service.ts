import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  BASE_URL = environment.apiUrl
  constructor(
    private http:HttpClient
  ) { }
  
  addScore(user: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}scores`, user);
  }

  // GET all users
  getScores(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}scores`);
  }

  // GET all users
  getgames(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}games`);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}users`);
  }

  // POST a new user
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.BASE_URL}users`, user);
  }

  // GET a single user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.BASE_URL}users/${id}`);
  }

  // PUT (update) a user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.patch<any>(`${this.BASE_URL}users/${id}`, user);
  }

  // DELETE a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}users/${id}`);
  }
}
