import { Component, Input, OnInit } from '@angular/core';
import { Sink } from 'src/app/services/interfaces/sink.interface';

@Component({
  selector: 'app-sink-item',
  templateUrl: './sink-item.component.html',
  styleUrls: ['./sink-item.component.scss']
})
export class SinkItemComponent implements OnInit {
  @Input()
  sink: Sink = {};

  constructor() { }

  ngOnInit(): void {
  }

}
