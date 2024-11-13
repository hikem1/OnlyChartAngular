import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInstrumentsService } from '../services/search-instruments.service';
import { Instrument } from '../models/instrument';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { InstrumentService } from '../services/instrument.service';
import { take } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { InstrumentCardComponent } from '../instrument-card/instrument-card.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    NgClass,
    NgIf,
    TitleCasePipe,
    InstrumentCardComponent
  ],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})

export class SearchListComponent implements OnInit{
  keyword!: string;
  matchInstruments: Instrument[] = [];
  cardOption: string = "plus";
  optionMethod: string = "search";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchInstrumentsService: SearchInstrumentsService,
    private localStrorageService: LocalStorageService,
    private instrumentService: InstrumentService,
    private errorService: ErrorService,
  ){
    this.instrumentService.instruments$.subscribe(instruments => {
      instruments.forEach(instrument => {
        this.matchInstruments.forEach(matchInstrument => {
          if(instrument.id === matchInstrument.id){
            matchInstrument.active = instrument.active;
            matchInstrument.favorite = instrument.favorite;
            matchInstrument.selected = instrument.selected;
            matchInstrument.graph_link = instrument.graph_link;
          }
        })
      })
    })
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.keyword = params["keyword"];
      this.instrumentService.search(this.keyword)
      .pipe(take(1))
      .subscribe({
        next: (instruments)=>{
          this.matchInstruments = []
          const localInstruments = this.localStrorageService.get("instruments")
          instruments.forEach(matchInstrument=> {
            matchInstrument = new Instrument(matchInstrument);
            localInstruments.forEach(localInstrument => {
              if(localInstrument.id === matchInstrument.id){
                matchInstrument.active = localInstrument.active;
                matchInstrument.favorite = localInstrument.favorite;
                matchInstrument.selected = localInstrument.selected;
                matchInstrument.graph_link = localInstrument.graph_link;
              }
            })
            this.matchInstruments.push(matchInstrument)
          })
        },
        error: (error)=>{
          this.errorService.showError(error)
          }
      })  
    })
  }
  // onPlus(instrument: Instrument): void{
  //   if(!this.instrumentService.isPresent(instrument)){
  //     if(!instrument.graph_link){
  //       this.instrumentService.findGraphLinkInstrument(instrument)
  //       .pipe(take(1))
  //       .subscribe({
  //         next: (graph_link) => {
  //           instrument.graph_link = graph_link
  //           this.instrumentService.addInstrument(instrument);
  //         },
  //         error: (error)=> {
  //           this.errorService.showError(error);
  //         }
  //       });
  //     }else{
  //       this.instrumentService.addInstrument(instrument);
  //     }
  //   }
  // }
  // onStar(instrument: Instrument){
  //   if(!this.favoriteInstrumentsService.isFavorite(instrument)){
  //     this.instrumentService.findGraphLinkInstrument(instrument)
  //     .pipe(take(1))
  //     .subscribe({
  //       next: (graph_link) => {
  //         instrument.graph_link = graph_link
  //         this.favoriteInstrumentsService.addInstrument(instrument);
  //       },
  //       error: (error)=> {
  //         this.errorService.showError(error);
  //       }
  //     });
  //   }else{
  //     this.favoriteInstrumentsService.removeInstrument(instrument);
  //   }
  // }
  
}
