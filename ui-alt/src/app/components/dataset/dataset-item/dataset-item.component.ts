import { Component, Input, OnInit } from '@angular/core';
import { Dataset } from 'src/app/services/interfaces/dataset.interface';

@Component({
  selector: 'app-dataset-item',
  templateUrl: './dataset-item.component.html',
  styleUrls: ['./dataset-item.component.scss'],
})
export class DatasetItemComponent implements OnInit {
  @Input()
  dataset: Dataset = {};

  constructor() {}

  ngOnInit(): void {}
}
