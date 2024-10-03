import { Component, Input, OnInit } from '@angular/core';
import { Instrument } from '../models/instrument';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-graph-tab',
  standalone: true,
  imports: [],
  templateUrl: './graph-tab.component.html',
  styleUrl: './graph-tab.component.scss'
})
export class GraphTabComponent implements OnInit{
  urlSafe!: SafeResourceUrl;
  @Input() instrument!: Instrument

  constructor(private domSanitizer: DomSanitizer){
  }
  ngOnInit(): void {
    if(this.instrument.graph_link !== null){
      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.instrument.graph_link)
    }
  }
}
