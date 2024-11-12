import { Component } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user.service';
import { InstrumentService } from '../services/instrument.service';
import { Instrument } from '../models/instrument';
import { GraphTabNavComponent } from '../graph-tab-nav/graph-tab-nav.component';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { NavCollapseService } from '../services/nav-collapse.service';
import { InstrumentCardComponent } from '../instrument-card/instrument-card.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    InstrumentCardComponent,
    GraphTabNavComponent,
    GraphTabComponent,
    RouterLink,
    RouterLinkActive,
    CommonModule,
    NgClass
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  instruments:  Instrument[] = [];
  isCollapsed: boolean = true;
  cardOption: string = "remove";
  optionMethod: string = "favorite";

  constructor(
    private router: Router,
    public userService: UserService,
    private instrumentService: InstrumentService,
    private favoriteInstrumentsService: FavoriteInstrumentsService, 
    private navCollapseService: NavCollapseService
  ){
    this.navCollapseService.isCollapsed$.subscribe(isCollapsed => this.isCollapsed = isCollapsed)
  }
  ngOnInit(): void {
    this.cardOption = "remove"
    this.optionMethod = "favorite"
    this.instrumentService.instruments$.subscribe(instruments => {this.instruments = instruments})
    this.favoriteInstrumentsService.favoriteInstruments$.subscribe(instruments => {
      this.instruments.forEach(instrument => {
        if(this.favoriteInstrumentsService.isFavorite(instrument)){
          instrument.favorite = true;
        }else{
          instrument.favorite = false;
        }
      })
    })
  }
  onNavClick(){
    this.navCollapseService.hide();
  }
  onCloseClick(){
    this.navCollapseService.hide();
  }
  onBackgroundClick(){
    this.navCollapseService.hide();
  }
}
