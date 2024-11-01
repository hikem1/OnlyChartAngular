import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private http = inject(HttpClient);
  private user: User = new User();

  constructor() { }
  login(formValues: FormGroup){
    this.http.get<User>(`http://4.233.147.4:3000/login?email=${formValues.value.email}&password=${formValues.value.password}`).subscribe(data => {
      const user = new User();
      this.user = user.fromJson(data);
    });
  }
  logout(){
    this.http.get<User>("http://4.233.147.4:3000/logout").subscribe(data => {
      const user = new User();
      this.user = user.fromJson(data);
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
