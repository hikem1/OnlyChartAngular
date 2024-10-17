import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class FavoriteInstrumentsService {
  favoriteInstruments: Instrument[] = [];

  constructor(private localStorageService: LocalStorageService) { 
    this.favoriteInstruments = this.loadFavoriteInstruments();
  }
  loadFavoriteInstruments(): Instrument[]{
    const favoriteInstruments: Instrument[] = []
    const instruments: Instrument[] = this.localStorageService.get('instruments');
    instruments.forEach((instrument: Instrument) => {
      favoriteInstruments.push(this.parseInstrument(instrument))
    })
    return favoriteInstruments
  }
  parseInstrument(jsonInstrument: any): Instrument{
    const instrument: Instrument = new Instrument(jsonInstrument);
    instrument.favorite = true;
    return instrument
  }
  toggleInstrument(instrument: Instrument): void{
    if(!this.isFavorite(instrument)){
      this.addInstrument(instrument);
    }else{
      this.removeInstrument(instrument);
    }
  }
  addInstrument(instrument: Instrument): void{
    instrument.favorite = true;
    this.favoriteInstruments.push(instrument);
    this.localStorageService.set("instruments", this.favoriteInstruments)
  }
  removeInstrument(instrument: Instrument): void {
    instrument.favorite = false;
    this.favoriteInstruments = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id !== instrument.id)
    this.localStorageService.set("instruments", this.favoriteInstruments)
  }
  getInstruments(): Instrument[]{
    return [...this.favoriteInstruments]
  }
  isFavorite(instrument: Instrument): boolean{
    this.favoriteInstruments = this.loadFavoriteInstruments();
    const isPresent: Instrument[] = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)
    return isPresent.length > 0;
  }
  hasGraphLink(instrument: Instrument): boolean{
    this.favoriteInstruments = this.loadFavoriteInstruments();
    const found: Instrument[] = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)
    return found[0].graph_link !== null;
  }
  prefereFavoriteInstrument(instrument: Instrument): Instrument{
    return this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)[0]
  }
}
