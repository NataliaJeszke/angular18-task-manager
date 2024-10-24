import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  private filters: string[] = ['All', 'Completed', 'Pending'];
  private selectedDate = new Subject<string>();
  private checkboxStateChange = new Subject<boolean>();
  private statusChange = new Subject<string>();
  
  checkboxStateChange$ = this.checkboxStateChange.asObservable();
  selectedDate$ = this.selectedDate.asObservable();
  statusChange$ = this.statusChange.asObservable();


  getFilters(): string[] {
    return this.filters;
  }

  getTodayDate(): string {
    const today = new Date();
    return String(today)
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