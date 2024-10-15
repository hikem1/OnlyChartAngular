import { Component, Input, OnInit } from '@angular/core';
import { Instrument } from '../models/instrument';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-graph-tab',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './graph-tab.component.html',
  styleUrl: './graph-tab.component.scss'
})

export class GraphTabComponent implements OnInit{
  @Input() instrument!: Instrument;
  urlSafe: SafeResourceUrl|null = null;

  constructor(
    private domSanitizer: DomSanitizer,
  ){
  }
  ngOnInit(): void {
    if(this.instrument.graph_link !== null){
      this.urlSafe = this.domSanitizer.bypassSecurityTrustResourceUrl(this.instrument.graph_link)
    }
  }
}
