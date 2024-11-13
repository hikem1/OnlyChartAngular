import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { NgClass } from '@angular/common';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { InstrumentService } from '../services/instrument.service';
import { take } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-star',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './star.component.html',
  styleUrl: './star.component.scss'
})
export class StarComponent {
  @Input() instrument!: Instrument;
  @Input() optionMethod!: string;

  constructor(
    private favoriteInstrumentsService: FavoriteInstrumentsService,
    private instrumentService: InstrumentService,
    private errorService: ErrorService,
    private router: Router
  ){}
    onStar(): void{
      if(this.optionMethod === "favorite"){
        this.onStarFavorite()
      }else if(this.optionMethod === "search"){
        this.onStarSearch()
      }
    }
    onStarFavorite(){
      this.instrumentService.toggleFavoriteInstrument(this.instrument);
    }
    onStarSearch(){
      if(!this.instrument.favorite){
        this.instrumentService.findGraphLinkInstrument(this.instrument)
        .pipe(take(1))
        .subscribe({
          next: (graph_link) => {
            this.instrument.graph_link = graph_link
            this.instrumentService.addInstrument(this.instrument);
            this.instrumentService.toggleFavoriteInstrument(this.instrument);
            this.router.navigateByUrl("favorites")
          },
          error: (error)=> {
            this.errorService.showError(error);
          }
        });
      }else{
        this.instrumentService.toggleFavoriteInstrument(this.instrument);
      }
    }
}
