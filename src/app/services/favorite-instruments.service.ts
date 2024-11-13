import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { LocalStorageService } from './local-storage.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FavoriteInstrumentsService {
  private favoriteInstrumentsSubject = new BehaviorSubject<Instrument[]>([]);
  favoriteInstruments$ = this.favoriteInstrumentsSubject.asObservable();

  constructor(private localStorageService: LocalStorageService) { 
    const favoriteInstruments = this.localStorageService.get('favorite-instruments')
    this.favoriteInstrumentsSubject.next(favoriteInstruments)
  }
  toggleInstrument(instrument: Instrument): void{
    if(!this.isFavorite(instrument)){
      // this.addInstrument(instrument);
    }else{
      this.removeInstrument(instrument);
    }
  }

  removeInstrument(instrument: Instrument): void {
    let favoriteInstruments: Instrument[] = this.localStorageService.get('favorite-instruments');
    instrument.favorite = false;
    favoriteInstruments = favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id !== instrument.id)
    this.localStorageService.set("favorite-instruments", favoriteInstruments);
    this.favoriteInstrumentsSubject.next(favoriteInstruments);
  }
  isFavorite(instrument: Instrument): boolean{
    const favoriteInstruments: Instrument[] = this.localStorageService.get('favorite-instruments');
    const isPresent: Instrument[] = favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)
    return isPresent.length > 0;
  }
  // hasGraphLink(instrument: Instrument): boolean{
  //   this.favoriteInstruments = this.loadFavoriteInstruments();
  //   const found: Instrument[] = this.favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)
  //   return found[0].graph_link !== null;
  // }
  prefereFavoriteInstrument(instrument: Instrument): Instrument{
    const favoriteInstruments: Instrument[] = this.localStorageService.get('favorite-instruments');
    return favoriteInstruments.filter(favoriteInstrument => favoriteInstrument.id === instrument.id)[0]
  }
}
