import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Instrument } from '../models/instrument';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgClass } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { InstrumentService } from '../services/instrument.service';
import { take } from 'rxjs';
import { ErrorService } from '../services/error.service';

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
  @Input() instrument!: Instrument;
  @Output() close = new EventEmitter<void>();

  urlSafe!: SafeResourceUrl;
  isLoading: boolean = false;

  constructor(
    private instrumentService: InstrumentService,
    private domSanitizer: DomSanitizer,
    private errorService: ErrorService
  ){
  }
  ngOnInit(): void {
    if(!this.instrument.graph_link){
      this.loadGraphLink();
    }else{
      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.instrument.graph_link)
    }
  }
  loadGraphLink(): void{
    this.isLoading = true
    this.instrumentService.findGraphLinkInstrument(this.instrument)
    .pipe(take(1))
    .subscribe({
      next: (graph_link)=>{
        this.instrument.graph_link = graph_link
        this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.instrument.graph_link)
        this.isLoading = false
      },
      error: (error)=>{
        this.errorService.showError(error);
        this.isLoading = false
        this.instrumentService.removeInstrument(this.instrument);
        this.close.emit();
      }
    })
  }
}
