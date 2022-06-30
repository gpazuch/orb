import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetItemComponent } from './dataset-item.component';

describe('DatasetItemComponent', () => {
  let component: DatasetItemComponent;
  let fixture: ComponentFixture<DatasetItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatasetItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
