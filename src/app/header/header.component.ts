import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { NavCollapseService } from '../services/nav-collapse.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent{

  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private router: Router,
    public userService: UserService,
    private navCollapseService: NavCollapseService
  ){
  }
  onLogoClick(): void{
    this.navCollapseService.toggleCollapse()
  }
  onNavClick(): void {
    // if(this.navbarContent.nativeElement.classList.contains('show')){
    //   this.navbarToggler.nativeElement.click();
    // }
  }
  onSubmit(){
    this.navCollapseService.hide()
    const keyword: string = this.form.value.search
    this.router.navigate(["search"], { queryParams: {keyword: keyword} });
  }
  onLogoutClick(){
    this.userService.logout()
  }
}
