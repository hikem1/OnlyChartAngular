import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss'
})
export class LoaderComponent {
  loading: boolean = false;

  constructor(private loaderservice: LoaderService){
  }
  
}
