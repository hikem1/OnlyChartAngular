import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { NgClass, TitleCasePipe } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { Router } from '@angular/router';
import { NavCollapseService } from '../services/nav-collapse.service';


@Component({
  selector: 'app-graph-tab-nav',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './graph-tab-nav.component.html',
  styleUrl: './graph-tab-nav.component.scss'
})

export class GraphTabNavComponent {
  @Input() instrument!: Instrument;

  constructor(
    private instrumentService: InstrumentService,
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private router: Router,
    private navCollapseService: NavCollapseService
  ){
  }
  onActiveTab(): void{
    this.instrumentService.setActiveInstrument(this.instrument);
    this.navCollapseService.toggleCollapse()
    this.navigateToHome()
  }
  onCloseTab(): void {
    this.instrumentService.removeInstrument(this.instrument);
  }
  onStar(): void{
    this.favoriteInstrumentsService.toggleInstrument(this.instrument)
  }
  navigateToHome(){
    if(this.router.url !== "/"){
      this.router.navigateByUrl("/")
    }
  }
}

