import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchInstrumentsService } from '../services/search-instruments.service';
import { Instrument } from '../models/instrument';
import { NgClass, NgIf, TitleCasePipe } from '@angular/common';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { InstrumentService } from '../services/instrument.service';
import { LoaderComponent } from '../loader/loader.component';
import { take } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    LoaderComponent,
    NgClass,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})

export class SearchListComponent implements OnInit{
  keyword!: string;
  instruments: Instrument[] = [];
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchInstrumentsService: SearchInstrumentsService,
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private instrumentService: InstrumentService,
    private errorService: ErrorService,
    private loaderService: LoaderService
  ){
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.keyword = params["keyword"];
      this.searchInstrumentsService.search(this.keyword)
      .pipe(take(1))
      .subscribe({
        next: (instruments)=>{
          this.searchInstrumentsService.pushInstruments(instruments as Instrument[])
          this.instruments = this.searchInstrumentsService.getInstruments()
        },
        error: (error)=>{
          this.errorService.showError(error)
          }
      })  
    })
  }
  onPlus(instrument: Instrument): void{
    if(this.favoriteInstrumentsService.isFavorite(instrument)){
      const favoriteInstrument = this.favoriteInstrumentsService.prefereFavoriteInstrument(instrument);
      this.instrumentService.addInstrument(favoriteInstrument);
    }else{
      this.instrumentService.addInstrument(instrument);
    }
    this.router.navigateByUrl("");
  }
  onStar(instrument: Instrument): void{
    if(this.favoriteInstrumentsService.isFavorite(instrument)){
      this.favoriteInstrumentsService.removeInstrument(instrument);
    }else{
      this.isLoading = true;
      this.instrumentService.findGraphLinkInstrument(instrument).subscribe(data=>{
        instrument.graph_link = (data as any).graph_link;
        this.favoriteInstrumentsService.addInstrument(instrument);
        this.isLoading = false;
      })
    }
  }
}
