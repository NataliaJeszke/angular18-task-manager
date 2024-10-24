import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  private filters: string[] = ['All', 'Completed', 'Pending'];
  private selectedDate = new BehaviorSubject<string | null>(null);
  private checkboxStateChange: Subject<boolean> = new Subject<boolean>();
  private statusChange = new Subject<string>();
  
  checkboxStateChange$ = this.checkboxStateChange.asObservable();
  statusChange$ = this.statusChange.asObservable();


  getFilters(): string[] {
    return this.filters;
  }

  getCheckboxChange(isChecked: boolean) {
    this.checkboxStateChange.next(isChecked);
  }

  
  getDateFilter(): Observable<string | null> {
    return this.selectedDate.asObservable().pipe(
      distinctUntilChanged()
    );
  }
  
  setDateFilter(date: string): void {
    this.selectedDate.next(date);
  }

  getTodayDate(): string {
    const today = new Date();
    return String(today)
  }

  getStatusChange(status: string): void {
    this.statusChange.next(status);
  }
}