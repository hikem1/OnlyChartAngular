import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { NgClass, TitleCasePipe } from '@angular/common';
import { StarComponent } from '../star/star.component';
import { PlusComponent } from '../plus/plus.component';
import { Router } from '@angular/router';
import { TrashComponent } from '../trash/trash.component';
import { InstrumentService } from '../services/instrument.service';
import { NavCollapseService } from '../services/nav-collapse.service';

@Component({
  selector: 'app-instrument-card',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe,
    StarComponent,
    PlusComponent,
    TrashComponent
  ],
  templateUrl: './instrument-card.component.html',
  styleUrl: './instrument-card.component.scss'
})
export class InstrumentCardComponent {
  @Input() instrument!: Instrument;
  @Input() cardOption!: string;
  @Input() optionMethod!: string;
  
  constructor(
    public router: Router,
    private instrumentService: InstrumentService,
    private navCollapseService: NavCollapseService,
  )
  {
  }
  onActiveTab(): void{
    if(this.cardOption === "remove"){
      this.router.navigateByUrl("/")
      this.instrumentService.setActiveInstrument(this.instrument);
      this.instrumentService.saveInstruments();
      this.instrumentService.updateInstruments();
      this.navCollapseService.hide();
    }
  }
}
