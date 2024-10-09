import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
const AUTH_API=process.env.SKILLE_DHAND_BACKEND+"/auth";

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
 

  constructor(private http: HttpClient) {}

  isLoggedIn: boolean = false;


  register(userDetails: { email: string; password: string,username:string }): Observable<boolean> {
    return this.http.post<any>(AUTH_API+"/register", userDetails)
      .pipe(
        map(response => {
          console.log(response)

          return true;
        }),
        catchError(error => {
    
          return of(false);
        })
      );
  }

  login(userDetails: { email: string; password: string }): Observable<boolean> {
    return this.http.post<any>(AUTH_API+"/login", userDetails)
      .pipe(
        map(response => {
          console.log(response)
          localStorage.setItem('JWT_Token', response.token);
          this.isLoggedIn = true;
          return true;
        }),
        catchError(error => {
          console.log(error);
          this.isLoggedIn = false;
          return of(false);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('JWT_Token');
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
