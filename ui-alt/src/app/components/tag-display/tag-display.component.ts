import { Component, Input, OnInit } from '@angular/core';
import { Tags } from 'src/app/services/interfaces/tag';

@Component({
  selector: 'app-tag-display',
  templateUrl: './tag-display.component.html',
  styleUrls: ['./tag-display.component.scss']
})
export class TagDisplayComponent implements OnInit {
  @Input()
  tags: Tags = {};

  constructor() { }

  ngOnInit(): void {
  }

}
