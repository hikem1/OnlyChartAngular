import { Component, OnInit} from '@angular/core';
import { Instrument } from '../models/instrument';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-graph-tab',
  standalone: true,
  imports: [
    LoaderComponent,
    NgClass,
  ],
  templateUrl: './graph-tab.component.html',
  styleUrl: './graph-tab.component.scss'
})

export class GraphTabComponent implements OnInit{
  instrument!: Instrument;
  urlSafe!: SafeResourceUrl | null;

  constructor(
    private instrumentService: InstrumentService,
    private domSanitizer: DomSanitizer,
  ){
  }
  ngOnInit(): void {
    this.instrumentService.instrument$.subscribe((instrument) => {
      if (instrument) {
        this.instrument = instrument;
        this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.instrument.graph_link)
      }else{
        this.urlSafe = null
      }
    });
  }
}
