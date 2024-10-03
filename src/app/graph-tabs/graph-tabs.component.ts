import { Component } from '@angular/core';
import { GraphTabComponent } from '../graph-tab/graph-tab.component';
import { GraphTabNavComponent } from '../graph-tab-nav/graph-tab-nav.component';

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
export class GraphTabsComponent {

}
