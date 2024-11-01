import { NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Injectable, inject, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { Popover } from 'bootstrap'
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

@Injectable({
  providedIn: 'root',
})

export class HeaderComponent{
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('navbarContent') navbarContent!: ElementRef;
  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router,
    public userService: UserService
  ){
  }
  onLogoClick(): void{
    this.router.navigateByUrl("");
    this.onNavClick();
  }
  onNavClick(): void {
    if(this.navbarContent.nativeElement.classList.contains('show')){
      this.navbarToggler.nativeElement.click();
    }
  }
  onSubmit(){
    const keyword: string = this.form.value.search
    this.router.navigate(["search"], { queryParams: {keyword: keyword} });
    this.onNavClick();
  }
  onLogoutClick(){
    this.userService.logout()
  }
}
