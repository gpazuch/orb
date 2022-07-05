import { Injectable } from '@angular/core';
import { defer, Observable, repeat, share, shareReplay, Subject } from 'rxjs';
import { FilterOption } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'any',
})
export class FilterService {
  private _filters: FilterOption[];

  private filters: Subject<FilterOption[]>;

  private filters$: Observable<FilterOption[]>;

  constructor() {
    this.filters = new Subject();
    this.filters$ = this.filters.asObservable();
    this._filters = [];
    this.cleanFilters();
  }

  getFilters() {
    return this.filters$;
  }

  resetFilters(filters: FilterOption[]) {
    this._filters = filters;
    this.filters.next(this._filters);
  }

  cleanFilters() {
    this._filters = [];
    this.filters.next([]);
  }

  addFilter(filter: FilterOption) {
    this._filters.push(filter);
    this.filters.next(this._filters);
  }

  removeFilter(index: number) {
    if (index >= 0 && index < this._filters.length) {
      this._filters.splice(index, 1);
      this.filters.next(this._filters);
    }
  }
}
