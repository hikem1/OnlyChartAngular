import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from './favorite-instruments.service';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SearchInstrumentsService {
  matchInstruments: Instrument[] = [];
  apiUrl: string = environment.apiUrl;

  constructor(
    private favoriteInstrument: FavoriteInstrumentsService,
    private http: HttpClient
  ) {}
  search(keyword: string){
    return this.http.get(`${this.apiUrl}/search/` + keyword);
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
