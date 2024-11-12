import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { InstrumentService } from '../services/instrument.service';
import { NavCollapseService } from '../services/nav-collapse.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { ErrorService } from '../services/error.service';

@Component({
  selector: 'app-plus',
  standalone: true,
  imports: [],
  templateUrl: './plus.component.html',
  styleUrl: './plus.component.scss'
})
export class PlusComponent {
  @Input() instrument!: Instrument;
  @Input() optionMethod!: string;

  constructor(
    private instrumentService: InstrumentService,
    private navCollapseService: NavCollapseService,
    private errorService: ErrorService,
    private router: Router
  )
  {}
  onPlus(){
    if(this.optionMethod === "favorite"){
      this.onPlusFavorite();
    }else if(this.optionMethod === "search"){
      this.onPlusSearch();
    }
    this.navCollapseService.hide();
  }
  onPlusFavorite(){
    if(!this.instrumentService.isPresent(this.instrument)){
      this.instrumentService.addInstrument(this.instrument);
    }
    this.instrumentService.setActiveInstrument(this.instrument)
    this.router.navigateByUrl("/")
  }
  onPlusSearch(){
    if(!this.instrumentService.isPresent(this.instrument)){
      if(!this.instrument.graph_link){
        this.instrumentService.findGraphLinkInstrument(this.instrument)
        .pipe(take(1))
        .subscribe({
          next: (graph_link) => {
            this.instrument.graph_link = graph_link
            this.instrumentService.addInstrument(this.instrument);
            this.instrumentService.setActiveInstrument(this.instrument)
            this.router.navigateByUrl("/")
          },
          error: (error)=> {
            this.errorService.showError(error);
          }
        });
      }else{
        this.instrumentService.addInstrument(this.instrument);
      }
    }
  }
}
