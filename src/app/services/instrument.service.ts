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
    this.getInstruments();
    this.updateInstruments();
  }
  // setFavoritesInstruments(){
  //   this.instruments.forEach(instrument => {
  //     if(this.favoriteInstrumentsService.isFavorite(instrument)){
  //       instrument.favorite = true;
  //     }else{
  //       instrument.favorite = false;
  //     }
  //   })
  // }
  addInstrument(instrument: Instrument){
    this.getInstruments();
    this.instruments.push(instrument);
    this.setActiveInstrument(instrument);
    this.saveInstruments();
    this.updateInstruments();
  }
  updateInstruments(){
    this.instrumentsSubject.next(this.instruments);
  }
  getInstruments(){
    this.instruments = this.localStorageService.get('instruments');
  }
  saveInstruments(){
    this.localStorageService.set("instruments", this.instruments);
  }
  toggleFavoriteInstrument(selectedInstrument: Instrument): void{
    this.getInstruments();
    if(selectedInstrument.selected){
      this.instruments.forEach(instrument => {
        if(selectedInstrument.id === instrument.id){
          instrument.favorite = !instrument.favorite;
        }
      })
    }else{
      this.instruments = this.instruments.filter(i => i.id !== selectedInstrument.id)
    }
    this.saveInstruments();
    this.updateInstruments();
  }
  removeInstrument(instrument: Instrument): void{
    this.getInstruments();
    if(instrument.favorite){
      this.instruments.forEach(instr => {
        if(instrument.id === instr.id){
          instr.selected = false;
          instr.active = false;
        }
      })
    }else{
      this.instruments = this.instruments.filter(i => i.id !== instrument.id)
    }
    this.saveInstruments();
    this.updateInstruments();
    this.instrumentSubject.next(null);
  }
  setActiveInstrument(activeInstrument: Instrument): void{
    this.instruments.forEach(instrument => {
      if(activeInstrument.id !== instrument.id){
        instrument.active = false;
      }else{
        instrument.active = true;
        instrument.selected = true;
        }
    })
    this.instrumentSubject.next(activeInstrument);
  }
  isPresent(instr: Instrument): boolean{
    this.getInstruments()
    const isPresent = this.instruments.filter(instrument => instr.id === instrument.id)
    return isPresent.length > 0;
  }
  findGraphLinkInstrument(instrument: Instrument){
    const headers = new HttpHeaders()
    return this.http.get(`${this.apiUrl}/graph-link?id=${instrument.id}&link=${instrument.link}`, { headers, responseType: 'text'})
  }
  search(keyword: string){
    return this.http.get<Instrument[]>(`${this.apiUrl}/search/` + keyword);
  }
}
