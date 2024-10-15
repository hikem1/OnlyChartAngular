import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
  private http = inject(HttpClient)

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  constructor(){
  }
  onSubmit(){
    this.http.post('http://localhost:8000/app/api', this.form.value).subscribe(data => {
      console.log(data);
    });
  }
}
