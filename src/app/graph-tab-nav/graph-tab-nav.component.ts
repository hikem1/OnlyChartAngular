import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Instrument } from '../models/instrument';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-graph-tab-nav',
  standalone: true,
  imports: [
    NgClass,
    TitleCasePipe
  ],
  templateUrl: './graph-tab-nav.component.html',
  styleUrl: './graph-tab-nav.component.scss'
})

export class GraphTabNavComponent {
  @Input() instrument!: Instrument
  @Output() close = new EventEmitter<void>();

  constructor(private instrumentservice: InstrumentService){

  }
  onActiveTab(instrument: Instrument): void{
    this.instrumentservice.setActiveInstrument(instrument);
  }
  onCloseTab(): void {
    this.close.emit();
  }
}

