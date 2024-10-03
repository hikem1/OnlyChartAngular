import { Component } from '@angular/core';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';

@Component({
  selector: 'app-graph-tabs',
  standalone: true,
  imports: [
    GraphTabComponent
  ],
  templateUrl: './graph-tabs.component.html',
  styleUrl: './graph-tabs.component.scss'
})
export class GraphTabsComponent {

}
