import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
    const headers = new HttpHeaders()
    return this.http.get(`http://4.233.147.4:3000/graph-link?id=${instrument.id}&link=${instrument.link}`, { headers, responseType: 'text'})
  }
}
