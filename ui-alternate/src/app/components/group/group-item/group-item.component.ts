import { Component, Input, OnInit } from '@angular/core';
import { AgentGroup } from 'src/app/services/interfaces/group.interface';

@Component({
  selector: 'app-group-item',
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss']
})
export class GroupItemComponent implements OnInit {
  @Input()
  group: AgentGroup = {};

  constructor() { }

  ngOnInit(): void {
  }

}
