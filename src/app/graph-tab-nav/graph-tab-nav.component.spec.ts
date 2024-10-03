import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTabNavComponent } from './graph-tab-nav.component';

describe('GraphTabNavComponent', () => {
  let component: GraphTabNavComponent;
  let fixture: ComponentFixture<GraphTabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphTabNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GraphTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
