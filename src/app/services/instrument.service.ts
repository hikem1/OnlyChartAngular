import { Injectable } from '@angular/core';
import instruments from '../../../public/assets/fixtures/instruments.json';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = [];
  
  constructor(private favoriteInstrumentsService: FavoriteInstrumentsService){
    instruments.forEach(instrument => 
      this.addInstrument(instrument)
    )
  }
  addInstrument(instrument: Instrument): void{
    const instrumentToAdd: Instrument = new Instrument(instrument);
    this.setFavoriteInstrument(instrumentToAdd);
    this.instruments.push(instrumentToAdd);
  }
  removeInstrument(instrument: Instrument): void{
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
  }
  getInstruments(): Instrument[]{
    return [...this.instruments]
  }
  setFavoriteInstrument(instrument: Instrument){
    if(this.favoriteInstrumentsService.isFavorite(instrument)){
      instrument.favorite = true;
    }  
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

}
