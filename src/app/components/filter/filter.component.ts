import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltersService } from '../../services/filters-service.service';
import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  filters: string[] = [];

  constructor(private filtersService: FiltersService, private taskService: TaskService) {
    this.filters = this.filtersService.getFilters();
  }

  onCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const isChecked = target.checked;
      this.filtersService.getCheckboxChange(isChecked);
    }
  }

  onDateChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      const selectedDate: string = target.value;
      this.filtersService.setDateFilter(selectedDate);
    }
  }

  onStatusChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target) {
      const selectedStatus: string = target.value;
      console.log(selectedStatus);
      this.filtersService.getStatusChange(selectedStatus);
    }
  }
}
