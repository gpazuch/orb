import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import {
  FilterOption,
  FilterTypes,
} from 'src/app/components/filter/filter.component';
import { FilterService } from 'src/app/services/filter.service';
import { Sink, SinkStates } from 'src/app/services/interfaces/sink.interface';
import { OrbService } from 'src/app/services/orb.service';

@Component({
  selector: 'app-sinks',
  templateUrl: './sinks.component.html',
  styleUrls: ['./sinks.component.scss'],
})
export class SinksComponent implements OnInit {
  filterOptions: FilterOption[];

  filters$!: Observable<FilterOption[]>;

  sinks$: Observable<Sink[]>;

  filteredSinks$: Observable<Sink[]>;

  addItem = false;

  constructor(private orb: OrbService, private filters: FilterService) {
    this.sinks$ = orb.getSinkListView();
    this.filters$ = filters.getFilters().pipe(startWith([]));

    this.filteredSinks$ = combineLatest({
      sinks: this.sinks$,
      filters: this.filters$,
    }).pipe(
      map(({ sinks, filters }) => {
        let filtered = sinks;
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
        filter: (sink: Sink, name: string) => {
          return sink.name?.includes(name);
        },
        type: FilterTypes.Input,
      },
      {
        name: 'Tags',
        prop: 'tags',
        filter: (sink: Sink, tag: string) => {
          const values = Object.entries(sink.tags)
            .map((entry) => `${entry[0]}: ${entry[1]}`)
            .flat();
          return values.includes(tag.trim());
        },
        autoSuggestion: orb.getSinksTags(),
        type: FilterTypes.AutoComplete,
      },
      {
        name: 'Backend',
        prop: 'backend',
        filter: (sink: Sink, backend: string) => {
          sink.backend === backend;
        },
        options: ['prometheus'],
        type: FilterTypes.MultiSelect,
      },
      {
        name: 'Status',
        prop: 'state',
        filter: (sink: Sink, states: string[]) => {
          return states.reduce((prev, cur) => {
            return sink.state === cur || prev;
          }, false);
        },
        type: FilterTypes.MultiSelect,
        options: Object.values(SinkStates).map((value) => value as string),
      },
    ];
  }

  ngOnInit(): void {}
}
