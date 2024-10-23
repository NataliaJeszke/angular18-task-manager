import { Component } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';

import { FiltersService } from '../../services/filters-service.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filters: string[] = [];

  constructor(private filtersService: FiltersService) {
    this.filters = this.filtersService.getFilters();
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const selectedDate: string = formatDate(target.value, 'dd-MM-yyyy', 'en-US');
      this.filtersService.setDateFilter(selectedDate);
    }
  }
}
