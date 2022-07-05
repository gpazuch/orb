import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinkItemComponent } from './sink-item.component';

describe('SinkItemComponent', () => {
  let component: SinkItemComponent;
  let fixture: ComponentFixture<SinkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SinkItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SinkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
