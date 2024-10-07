import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class FavoriteInstrumentsService {
  favoriteInstruments: Instrument[] = [];

  constructor(private localStorageService: LocalStorageService) { 
    this.favoriteInstruments = this.localStorageService.get('instruments');
  }
  toggleInstrument(instrument: Instrument): void{
    if(!this.isFavorite(instrument)){
      this.addInstrument(instrument);
    }else{
      this.removeInstrument(instrument);
    }
  }
  addInstrument(instrument: Instrument): void{
    this.favoriteInstruments.push(instrument);
    this.localStorageService.set("instruments", this.favoriteInstruments)
  }
  removeInstrument(instrument: Instrument): void {
    this.favoriteInstruments = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id !== instrument.id)
    this.localStorageService.set("instruments", this.favoriteInstruments)
  }
  getInstruments(): Instrument[]{
    return [...this.favoriteInstruments]
  }
  isFavorite(instrument: Instrument): boolean{
    this.favoriteInstruments = this.localStorageService.get('instruments');
    const isPresent = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)
    return isPresent.length > 0;
  }
}
