import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Filter } from '../models/filter.model';
import { FilterStatus } from '../utils/filter-status.enum';

@Injectable({
  providedIn: 'root',
})
export class FiltersService {
  private filterState: Filter = {
    filters: Object.values(FilterStatus),
    selectedDate: '',
    checkboxState: false,
    statusChange: '',
  };

  private selectedDate = new Subject<string>();
  private checkboxStateChange = new Subject<boolean>();
  private statusChange = new Subject<string>();

  checkboxStateChange$ = this.checkboxStateChange.asObservable();
  selectedDate$ = this.selectedDate.asObservable();
  statusChange$ = this.statusChange.asObservable();

  getFilters(): string[] {
    return this.filterState.filters;
  }

  getTodayDate(): string {
    const today = new Date();
    return String(today);
  }

  setCheckboxChange(isChecked: boolean) {
    this.checkboxStateChange.next(isChecked);
  }

  setDateFilter(date: string): void {
    this.selectedDate.next(date);
  }

  setStatusChange(status: string): void {
    this.statusChange.next(status);
  }
}
