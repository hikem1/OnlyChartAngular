import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavCollapseService {
  isCollapsedSubject = new Subject<boolean>;
  isCollapsed$ = this.isCollapsedSubject.asObservable()
  isCollapsed: boolean = true;

  constructor() {
    this.isCollapsedSubject.next(this.isCollapsed)
  }
  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
    this.isCollapsedSubject.next(this.isCollapsed)
  }
  hide(){
    this.isCollapsed = true;
    this.isCollapsedSubject.next(this.isCollapsed)
  }
}
