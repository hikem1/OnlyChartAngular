import { NgClass } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent{
  @ViewChild('navbarToggler') navbarToggler!: ElementRef;
  @ViewChild('navbarContent') navbarContent!: ElementRef;

  constructor(private router: Router){
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
}
