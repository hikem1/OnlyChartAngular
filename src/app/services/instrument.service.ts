import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = [];
  apiUrl: string = environment.apiUrl;

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private localStorageService: LocalStorageService,
    private http: HttpClient,
  ){
    this.instruments = this.loadHomeInstruments()
  }
  loadHomeInstruments(): Instrument[]{
    const homeInstruments: Instrument[] = []
    const instruments: Instrument[] = this.localStorageService.get('home-instruments');
    instruments.forEach((instrument: Instrument) => {
      homeInstruments.push(this.parseInstrument(instrument))
    })
    return homeInstruments;
  }
  parseInstrument(jsonInstrument: any): Instrument{
    const instrument: Instrument = new Instrument(jsonInstrument);
    return instrument
  }
  addInstrument(instrument: Instrument){
    this.instruments.push(instrument);
    this.localStorageService.set("home-instruments", this.instruments);
    this.setActiveInstrument(instrument);
  }
  updateHomeInstrument(instrument: Instrument): void{
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
    this.instruments.push(instrument);
    this.localStorageService.set("home-instruments", this.instruments)
  }
  removeInstrument(instrument: Instrument): void{
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
    this.localStorageService.set("home-instruments", this.instruments)
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
    return this.http.get(`${this.apiUrl}/graph-link?id=${instrument.id}&link=${instrument.link}`, { headers, responseType: 'text'})
  }
}
