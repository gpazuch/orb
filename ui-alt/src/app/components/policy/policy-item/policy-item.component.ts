import { Component, Input, OnInit } from '@angular/core';
import { AgentPolicy } from 'src/app/services/interfaces/policy.interface';

@Component({
  selector: 'app-policy-item',
  templateUrl: './policy-item.component.html',
  styleUrls: ['./policy-item.component.scss'],
})
export class PolicyItemComponent implements OnInit {
  @Input()
  policy: AgentPolicy = {};

  constructor() {}

  ngOnInit(): void {}

  policyState() {
    const state = 'stale';

    return state;
  }
}
