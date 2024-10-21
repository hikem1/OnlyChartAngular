import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { Observable } from 'rxjs';
import { FavoriteInstrumentsService } from './favorite-instruments.service';

@Injectable({
  providedIn: 'root'
})
export class SearchInstrumentsService {
  matchInstruments: Instrument[] = [];

  constructor(
    private favoriteInstrument: FavoriteInstrumentsService,
    private http: HttpClient
  ) {
  }
  search(keyword: string): Observable<Object>{
    return this.http.get('http://192.168.1.38:8000/src/index.php?search=' + keyword);
  }
  pushInstruments(instruments: Instrument[]){
    this.matchInstruments = [];
    (instruments as Instrument[]).forEach((instrument: Instrument) => {
        const matchInstrument = new Instrument(instrument);
        if(this.favoriteInstrument.isFavorite(matchInstrument)){
          matchInstrument.favorite = true;
        }
        this.matchInstruments.push(matchInstrument);
      });
  }
  getInstruments(): Instrument[]{
    return this.matchInstruments;
  }
}
