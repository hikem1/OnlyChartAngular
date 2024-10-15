import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Instrument } from '../models/instrument';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchInstrumentsService {
  matchInstruments: Instrument[] = [];

  constructor(private http: HttpClient) {
  }
  search(keyword: string): Observable<Object>{
    return this.http.get('http://localhost:8000/app/api?search=' + keyword)
    // this.matchInstruments = [];
    // this.http.get('http://localhost:8000/app/api?search=' + keyword).subscribe(jsonInstruments => {
    //   (jsonInstruments as Instrument[]).forEach((instrument: Instrument) => {
    //     this.matchInstruments.push(new Instrument(instrument))
    //   });
    // });
    // return this.matchInstruments;
  }
  pushInstruments(instruments: Instrument[]){
    this.matchInstruments = [];
    (instruments as Instrument[]).forEach((instrument: Instrument) => {
        this.matchInstruments.push(new Instrument(instrument))
      });
  }
  getInstruments(): Instrument[]{
    return this.matchInstruments;
  }
}
