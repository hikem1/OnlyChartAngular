import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTabsComponent } from './graph-tabs.component';

describe('GraphTabsComponent', () => {
  let component: GraphTabsComponent;
  let fixture: ComponentFixture<GraphTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
