import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  private selectedDateSubject = new BehaviorSubject<string | null>(null);
  private checkboxStateSubject = new BehaviorSubject<boolean>(false);
  private statusSubject = new BehaviorSubject<string>('');

  selectedDate$ = this.selectedDateSubject.asObservable();
  checkboxStateChange$ = this.checkboxStateSubject.asObservable();
  statusChange$ = this.statusSubject.asObservable();

  getFilters(): string[] {
    return this.filterState.filters;
  }

  getTodayDate(): string {
    const today = new Date();
    return String(today);
  }

  setCheckboxChange(isChecked: boolean): void {
    this.checkboxStateSubject.next(isChecked);
  }

  setDateFilter(date: string): void {
    this.selectedDateSubject.next(date);
  }

  setStatusChange(status: string): void {
    this.statusSubject.next(status);
  }
}
