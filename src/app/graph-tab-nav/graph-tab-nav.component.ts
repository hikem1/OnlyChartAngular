import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';

@Component({
  selector: 'app-graph-tab-nav',
  standalone: true,
  imports: [],
  templateUrl: './graph-tab-nav.component.html',
  styleUrl: './graph-tab-nav.component.scss'
})

export class GraphTabNavComponent {
  @Input() instrument!: Instrument
}
