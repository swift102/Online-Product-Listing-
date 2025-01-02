import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterUser } from '../shared/user';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  
  
  apiUrl = 'http://localhost:5240/api/Authentication'



  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { emailaddress: email, password: password };

    return this.httpClient.post(`${this.apiUrl}/Login`, body, this.httpOptions)
      .pipe(
        map((response: any) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
          }
          return response;
        })
      );
  }
  getAuthentications(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}/GetAllAuthentications`)
      .pipe(catchError(this.handleError));
  }

  register(user: { emailaddress: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/Register`, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

   private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something bad happened; please try again later.');
  }
}