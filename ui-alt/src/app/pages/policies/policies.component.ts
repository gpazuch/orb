import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  FilterOption,
  FilterTypes,
} from 'src/app/components/filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { AgentPolicy } from 'src/app/services/interfaces/policy.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.scss'],
})
export class PoliciesComponent implements OnInit {
  filterOptions: FilterOption[];

  filters$!: Observable<FilterOption[]>;

  policies$: Observable<AgentPolicy[]>;

  filteredPolicies$: Observable<AgentPolicy[]>;

  addItem = true;

  constructor(private orb: OrbService, private filters: FilterService) {
    this.policies$ = orb.getPolicyListView();
    this.filters$ = filters.getFilters().pipe(startWith([]));

    this.filteredPolicies$ = combineLatest({
      policies: this.policies$,
      filters: this.filters$,
    }).pipe(
      map(({ policies, filters }) => {
        let filtered = policies;
        filters.forEach((filter) => {
          filtered = filtered.filter((value) => {
            const paramValue = filter.param;
            const result = filter.filter(value, paramValue);
            return result;
          });
        });

        return filtered;
      })
    );

    this.filterOptions = [
      {
        name: 'Name',
        prop: 'name',
        filter: (policy: AgentPolicy, name: string) => {
          return policy.name?.includes(name);
        },
        type: FilterTypes.Input,
      },
    ];
  }

  ngOnInit(): void {}

  policyState() {
    const state = 'stale';
    return state;
  }
}
