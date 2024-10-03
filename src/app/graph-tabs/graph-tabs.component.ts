import { Component, OnInit } from '@angular/core';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { GraphTabNavComponent } from '../graph-tab-nav/graph-tab-nav.component';
import { InstrumentService } from '../services/instrument.service';
import { Instrument } from '../models/instrument';

@Component({
  selector: 'app-graph-tabs',
  standalone: true,
  imports: [
    GraphTabNavComponent,
    GraphTabComponent
  ],
  templateUrl: './graph-tabs.component.html',
  styleUrl: './graph-tabs.component.scss'
})
export class GraphTabsComponent implements OnInit{
  instruments: Instrument[] = []

  constructor(private instrumentService: InstrumentService){
    this.instrumentService = instrumentService
  }
  ngOnInit(): void {
    this.instruments = this.instrumentService.getInstruments();
  }
}
