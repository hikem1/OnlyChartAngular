import { Component, OnInit } from '@angular/core';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { GraphTabNavComponent } from '../graph-tab-nav/graph-tab-nav.component';
import { InstrumentService } from '../services/instrument.service';
import { Instrument } from '../models/instrument';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-graph-tabs',
  standalone: true,
  imports: [
    GraphTabNavComponent,
    GraphTabComponent, 
    NgClass
  ],
  templateUrl: './graph-tabs.component.html',
  styleUrl: './graph-tabs.component.scss'
})

export class GraphTabsComponent implements OnInit{
  instruments: Instrument[] = []

  constructor(
    private instrumentService: InstrumentService,
  ){
  }
  ngOnInit(): void {
    this.instruments = this.instrumentService.getInstruments();
  }
  closeTab(instrument: Instrument): void {
    this.instruments = this.instruments.filter(instr => instr.id !== instrument.id);
  }
}
