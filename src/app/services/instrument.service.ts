import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import instruments from '../../../public/assets/fixtures/instruments.json';

@Injectable({
  providedIn: 'root'
})

export class InstrumentService {
  private instruments: Instrument[] = []

  constructor(){
    instruments.forEach(instrument => 
      this.instruments.push(new Instrument(instrument))
    )
  }
  getInstruments(): Instrument[]{
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

}
