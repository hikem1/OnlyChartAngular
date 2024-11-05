import { Component, ElementRef, Injectable, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class SignInComponent {
  @ViewChild('errorMessage') errorMessage!: ElementRef;
  
  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(public userService: UserService){
  }
  onSubmit(){
    this.userService.login(this.form)
  }
}
