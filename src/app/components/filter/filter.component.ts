import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
      const selectedDate = new Date(target.value);
      this.filtersService.setDateFilter(selectedDate);
    }
  }
}
