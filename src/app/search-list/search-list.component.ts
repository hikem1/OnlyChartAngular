import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, ActivationStart, NavigationStart, Router } from '@angular/router';
import { SearchInstrumentsService } from '../services/search-instruments.service';
import { Instrument } from '../models/instrument';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { InstrumentService } from '../services/instrument.service';
ActivationEnd
@Component({
  selector: 'app-search-list',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './search-list.component.html',
  styleUrl: './search-list.component.scss'
})
export class SearchListComponent implements OnInit{
  keyword!: string;
  instruments: Instrument[] = [];
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private searchInstrumentsService: SearchInstrumentsService,
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private instrumentService: InstrumentService
  ){
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.keyword = params["keyword"];
      this.searchInstrumentsService.search(this.keyword).subscribe(instruments => {
        this.searchInstrumentsService.pushInstruments(instruments as Instrument[])
        this.instruments = this.searchInstrumentsService.getInstruments()
        this.loading = false;
      })  
    })
  }
  onPlus(instrument: Instrument): void{
    this.loading = true;
    this.instrumentService.findGraphLinkInstrument(instrument).subscribe(data=>{
      instrument.graph_link = (data as any).graph_link;
      this.instrumentService.addInstrument(instrument);
      this.router.navigateByUrl("");
    })
  }
  onStar(instrument: Instrument): void{
    this.favoriteInstrumentsService.toggleInstrument(instrument);
  }
}
