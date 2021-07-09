import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragboardComponent } from './dragboard.component';

describe('DragboardComponent', () => {
  let component: DragboardComponent;
  let fixture: ComponentFixture<DragboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DragboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DragboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
