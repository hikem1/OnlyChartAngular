import { Component, Input } from '@angular/core';
import { Instrument } from '../models/instrument';
import { FavoriteInstrumentsService } from '../services/favorite-instruments.service';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.scss'
})
export class TrashComponent {
  @Input() instrument!: Instrument

  constructor(private instrumentService: InstrumentService)
  {}
  onCloseTab(){
    this.instrumentService.removeInstrument(this.instrument);
  }
}
