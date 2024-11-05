import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';
import { catchError, take, throwError } from 'rxjs';
import { environment } from '../../environment/environment';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  private user: User = new User();
  apiUrl: string = environment.apiUrl;

  constructor(private errorService: ErrorService) { }
  login(formValues: FormGroup){
    this.http.get<User>(`${this.apiUrl}/login?email=${formValues.value.email}&password=${formValues.value.password}`)
    .pipe(take(1))
    .subscribe({
      next: (data)=>{
        const user = new User();
        this.user = user.fromJson(data);
      },
      error: (error)=> {
        this.errorService.showError(error)
      }
    });
  }
  logout(){
    this.http.get<User>(`${this.apiUrl}/logout`)
    .pipe(take(1))
    .subscribe({
      next: (data)=>{
        const user = new User();
        this.user = user.fromJson(data);
      },
      error: (error)=> {
        this.errorService.showError(error)
      }
    })
  }
  getUser(): User{
    return this.user;
  }
  getAuthStatus(): boolean{
    return this.user.authStatus;
  }
  getMessage(): string{
    return this.user.message;
  }
  getEmail(): string{
    return this.user.email;
  }
}
