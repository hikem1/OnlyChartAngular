import { Instrument } from '../models/instrument';
import { Component, OnInit } from '@angular/core';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
  ],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss'
})

export class FavoriteListComponent implements OnInit{
  favoriteInstruments: Instrument[] = []

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private instrumentService: InstrumentService,
  ){}
  ngOnInit(): void {
    this.favoriteInstrumentsService.favoriteInstruments$.subscribe(instruments => this.favoriteInstruments = instruments);
  }
  onStar(instrument: Instrument): void{
    this.favoriteInstrumentsService.removeInstrument(instrument);
    this.instrumentService.setFavoritesInstruments();
  }
  onPlus(instrument: Instrument){
    if(!this.instrumentService.isPresent(instrument)){
      this.instrumentService.addInstrument(instrument);
    }
  }
}