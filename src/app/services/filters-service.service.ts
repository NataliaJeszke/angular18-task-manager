import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class FiltersService {
  private filters: string[] = ['All', 'Completed', 'Pending'];
  private selectedDate = new BehaviorSubject<string | null>(null);

  getFilters(): string[] {
    return this.filters;
  }

  setDateFilter(date: string): void {
    this.selectedDate.next(date);
    console.log('Selected Date:', this.selectedDate.getValue());
  }

  getDateFilter(): Observable<string | null> {
    return this.selectedDate.asObservable().pipe(
      distinctUntilChanged()
    );
  }
}