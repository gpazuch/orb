import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, retry, share, Subject, switchMap, takeUntil, timer } from 'rxjs';
import { AgentService } from './agent.service';
import { DatasetService } from './dataset.service';
import { GroupService } from './group.service';
import { PolicyService } from './policy.service';
import { SinkService } from './sink.service';
import {Agent} from "./interfaces/agent.interface";
import {AgentGroup} from "./interfaces/group.interface";
import {Dataset} from "./interfaces/dataset.interface";
import {AgentPolicy} from "./interfaces/policy.interface";
import {Sink} from "./interfaces/sink.interface";

@Injectable({
  providedIn: 'root'
})
export class OrbService implements OnDestroy {
  // ms
  pollInterval = 30000;
  private stopPolling: Subject<void>;
  private pollTimer: Observable<number>;
  private agents$: Observable<Agent[]>;
  private groups$: Observable<AgentGroup[]>;
  private datasets$: Observable<Dataset[]>;
  private policies$: Observable<AgentPolicy[]>;
  private sinks$: Observable<Sink[]>;

  constructor(
    private agent: AgentService,
    private dataset: DatasetService,
    private group: GroupService,
    private policy: PolicyService,
    private sink: SinkService,
  ) {
    this.stopPolling = new Subject<void>();
    this.pollTimer = timer(1, this.pollInterval).pipe(
      takeUntil(this.stopPolling),
    );

    this.agents$ = this.pollTimer.pipe(
      switchMap(() => this.agent.getAllAgents()),
      retry(),
      share(),
    );

    this.groups$ = this.pollTimer.pipe(
      switchMap(() => this.group.getAllGroups()),
      retry(),
      share(),
    );

    this.policies$ = this.pollTimer.pipe(
      switchMap(() => this.policy.getAllPolicies()),
      retry(),
      share(),
    );

    this.datasets$ = this.pollTimer.pipe(
      switchMap(() => this.dataset.getAllDatasets()),
      retry(),
      share(),
    );

    this.sinks$ = this.pollTimer.pipe(
      switchMap(() => this.sink.getAllSinks()),
      retry(),
      share(),
    );
  }

  ngOnDestroy() {
    this.stopPolling.next();
  }

  getAgentListView() {
    return this.agents$;
  }

  getGroupListView() {
    return this.groups$;
  }

  getPolicyListView() {
    return this.policies$;
  }

  getDatasetListView() {
    return this.datasets$;
  }

  getSinkListView() {
    return this.sinks$;
  }
}
