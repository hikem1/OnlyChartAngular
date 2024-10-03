import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import instruments from '../../../public/assets/fixtures/instruments.json';

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private instruments: Instrument[] = []

  constructor() { 
    instruments.forEach(instrument => 
      this.instruments.push(new Instrument(instrument))
    )
    console.log(this.instruments);
    
  }
  getInstruments(): Instrument[]{
    return [...this.instruments]
  }
}
