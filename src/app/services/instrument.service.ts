import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = [];
  private instrumentSubject = new BehaviorSubject<Instrument | null>(null);
  private instrumentsSubject = new BehaviorSubject<Instrument[]>([]);
  instrument$ = this.instrumentSubject.asObservable();
  instruments$ = this.instrumentsSubject.asObservable();
  apiUrl: string = environment.apiUrl;

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private localStorageService: LocalStorageService,
    private errorService: ErrorService,
    private http: HttpClient,
  ){
    this.instruments = this.localStorageService.get('home-instruments')
    this.setFavoritesInstruments();
    this.localStorageService.set("home-instruments", this.instruments)
    this.instrumentsSubject.next(this.instruments)
  }
  setFavoritesInstruments(){
    this.instruments.forEach(instrument => {
      if(this.favoriteInstrumentsService.isFavorite(instrument)){
        instrument.favorite = true;
      }else{
        instrument.favorite = false;
      }
    })
  }
  addInstrument(instrument: Instrument){
    this.instruments = this.localStorageService.get('home-instruments');
    this.instruments.push(instrument);
    this.setActiveInstrument(instrument);
    this.setFavoritesInstruments();
    this.localStorageService.set("home-instruments", this.instruments);
    this.instrumentsSubject.next(this.instruments);
  }
  removeInstrument(instrument: Instrument): void{
    this.instruments = this.localStorageService.get('home-instruments');
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
    this.setFavoritesInstruments();
    this.localStorageService.set("home-instruments", this.instruments);
    this.instrumentsSubject.next(this.instruments);
    this.instrumentSubject.next(null);
  }
  setActiveInstrument(activeInstrument: Instrument): void{
    this.instruments.forEach(instrument => {
      if(activeInstrument.id !== instrument.id){
        instrument.active = false
      }else{
        instrument.active = true
      }
    })
    this.instrumentSubject.next(activeInstrument);
  }
  isPresent(instr: Instrument): boolean{
    this.instruments = this.localStorageService.get('home-instruments');
    const isPresent = this.instruments.filter(instrument => instr.id === instrument.id)
    return isPresent.length > 0;
  }
  findGraphLinkInstrument(instrument: Instrument){
    const headers = new HttpHeaders()
    return this.http.get(`${this.apiUrl}/graph-link?id=${instrument.id}&link=${instrument.link}`, { headers, responseType: 'text'})
  }
}
