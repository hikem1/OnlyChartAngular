import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Instrument } from '../models/instrument';
import { NgClass, TitleCasePipe } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';

FavoriteInstrumentsService
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
  @Input() instrument!: Instrument
  @Output() close = new EventEmitter<void>();

  constructor(
    private instrumentservice: InstrumentService,
    private favoriteInstrumentsService: FavoriteInstrumentsService
  ){
  }
  onActiveTab(instrument: Instrument): void{
    this.instrumentservice.setActiveInstrument(instrument);
  }
  onCloseTab(instrument: Instrument): void {
    this.instrumentservice.removeInstrument(instrument);
    this.close.emit();
  }
  onStar(instrument: Instrument): void{
    this.favoriteInstrumentsService.toggleInstrument(instrument);
  }
}

