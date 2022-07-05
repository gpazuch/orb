import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable, Subject } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

export enum FilterTypes {
  Input, // string input
  AutoComplete,
  Select, // allows select one option
  MultiSelect, // allows select multi options
  Checkbox, // on|off option
}

export interface FilterOption {
  name: string;
  prop: string;
  filter: (item: any, value: any) => any;
  type: FilterTypes;
  param?: any;
  options?: string[];
  autoSuggestion?: Observable<string[]>;
}

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input()
  availableFilters!: FilterOption[];

  protected activeFilters$: Observable<FilterOption[]>;

  protected type = FilterTypes;

  protected selectedFilter!: FilterOption | null;

  protected filterParam: any;

  constructor(private filter: FilterService) {
    this.availableFilters = [];
    this.activeFilters$ = filter.getFilters();
  }

  ngOnInit(): void {}

  addFilter(): void {
    if (!this.selectedFilter) return;

    this.filter.addFilter({ ...this.selectedFilter, param: this.filterParam });

    this.selectedFilter = null;
    this.filterParam = null;
  }

  removeFilter(index: number) {
    this.filter.removeFilter(index);
  }

  filterChanged(event: MatSelectChange) {
    this.selectedFilter = { ...event.source.value };
  }
}
