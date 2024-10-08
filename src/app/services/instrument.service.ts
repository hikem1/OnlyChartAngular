import { Injectable } from '@angular/core';
import instrumentsFixture from '../../../public/assets/fixtures/instruments.json';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = [];
  
  constructor(private favoriteInstrumentsService: FavoriteInstrumentsService){
    this.instruments = this.loadInstruments();
  }
  loadInstruments(): Instrument[]{
    const instruments: Instrument[] = []
    instrumentsFixture.forEach(instrument => {
      const instrumentToAdd: Instrument = new Instrument(instrument);
      instrumentToAdd.favorite = this.favoriteInstrumentsService.isFavorite(instrument)
      instruments.push(instrumentToAdd);
    })
    return instruments;
  }
  addInstrument(instrument: Instrument): void{
    if(!this.isPresent(instrument)){
      this.instruments.push(instrument);
    }
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

}
