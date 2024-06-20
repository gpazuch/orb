import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  FilterOption,
  FilterTypes,
} from 'src/app/components/filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import {
  AgentGroup,
  GroupStates,
} from 'src/app/services/interfaces/group.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  filterOptions: FilterOption[];

  filters$!: Observable<FilterOption[]>;

  groups$: Observable<AgentGroup[]>;

  filteredGroups$: Observable<AgentGroup[]>;

  addItem = false;

  constructor(private orb: OrbService, private filters: FilterService) {
    this.groups$ = orb.getGroupListView();
    this.filters$ = filters.getFilters().pipe(startWith([]));

    this.filteredGroups$ = combineLatest({
      groups: this.groups$,
      filters: this.filters$,
    }).pipe(
      map(({ groups, filters }) => {
        let filtered = groups;
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
        filter: (group: AgentGroup, name: string) => {
          return group.name?.includes(name);
        },
        type: FilterTypes.Input,
      },
      {
        name: 'Tags',
        prop: 'tags',
        filter: (group: AgentGroup, tag: string) => {
          const values = Object.entries(group.tags)
            .map((entry) => `${entry[0]}: ${entry[1]}`)
            .flat();
          return values.includes(tag.trim());
        },
        autoSuggestion: orb.getGroupsTags(),
        type: FilterTypes.AutoComplete,
      },
      {
        name: 'Status',
        prop: 'state',
        filter: (group: AgentGroup, states: string[]) => {
          return states.reduce((prev, cur) => {
            return group.state === cur || prev;
          }, false);
        },
        type: FilterTypes.MultiSelect,
        options: Object.values(GroupStates).map((value) => value as string),
      },
    ];
  }

  ngOnInit(): void {}
}
