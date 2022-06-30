import { Component, OnInit } from '@angular/core';
import { last, lastValueFrom, Observable } from 'rxjs';
import { Agent } from 'src/app/services/interfaces/agent.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit {
  agents$: Observable<Agent[]>;

  constructor(
    private orb: OrbService,
  ) {
    this.agents$ = this.orb.getAgentListView();
  }

  ngOnInit(): void {
  }

}
