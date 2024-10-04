import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { NgClass } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-graph-tab-nav',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './graph-tab-nav.component.html',
  styleUrl: './graph-tab-nav.component.scss'
})

export class GraphTabNavComponent {
  @Input() instrument!: Instrument
  graphTabComponent!: GraphTabComponent;
  
  constructor(private instrumentservice: InstrumentService){

  }
  onActiveTab(instrument: Instrument): void{
    this.instrumentservice.setActiveInstrument(instrument);
  }
}

