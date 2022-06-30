import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AgentPolicy } from 'src/app/services/interfaces/policy.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss']
})
export class PoliciesComponent implements OnInit {
  policies$: Observable<AgentPolicy[]>;

  constructor(
    private orb: OrbService,
  ) {
    this.policies$ = orb.getPolicyListView();
  }

  ngOnInit(): void {
  }

}
