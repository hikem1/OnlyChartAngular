import { ErrorHandler, Injectable, inject } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = [];
  newInstrument!: Instrument;
  hasNewInstrument: boolean = false
  emitInstrument!: Observable<Instrument>

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private http: HttpClient,
  ){
  }
  addInstrument(instrument: Instrument){
    this.instruments.push(instrument)
    this.setActiveInstrument(instrument)
  }
  removeInstrument(instrument: Instrument): void{
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
  }
  getInstruments(): Instrument[]{
    this.instruments.forEach((instrument) => {
      instrument.favorite = this.favoriteInstrumentsService.isFavorite(instrument)
    })
    return [...this.instruments]
  }
  setActiveInstrument(activeInstrument: Instrument): void{
    this.instruments.forEach(instrument => {
      if(activeInstrument.id !== instrument.id){
        instrument.active = false
      }else{
        instrument.active = true
      }
    })
  }
  isPresent(instr: Instrument): boolean{
    const isPresent = this.instruments.filter(instrument => instr.id === instrument.id)
    return isPresent.length > 0;
  }
  findGraphLinkInstrument(instrument: Instrument){
    return this.http.get(`http://192.168.1.38:8000/src/index.php?id=${instrument.id}&link=${instrument.link}`)
  }
}
