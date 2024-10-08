import { Instrument } from '../models/instrument';
import { Component, OnInit } from '@angular/core';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss'
})

export class FavoriteListComponent implements OnInit{
  favoriteInstruments: Instrument[] = []

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private instrumentService: InstrumentService,
    private router: Router
  ){}
  ngOnInit(): void {
    this.favoriteInstruments = this.favoriteInstrumentsService.getInstruments();
  }
  onStar(instrument: Instrument): void{
    this.favoriteInstrumentsService.toggleInstrument(instrument);
  }
  onPlus(instrument: Instrument){
    this.instrumentService.addInstrument(instrument);
    this.router.navigateByUrl("");
  }
}