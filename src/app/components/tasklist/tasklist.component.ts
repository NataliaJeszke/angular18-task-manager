import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../ui/button/button.component';
import { TaskComponent } from './task/task.component';
import { FormComponent } from '../ui/form/form.component';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task-service.service';
import { FiltersService } from '../../services/filters-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent, FormComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  showForm = false;
  addingNewTask = false;
  private checkboxStateSubscription: Subscription | undefined;
  private dateFilterSubscription: Subscription | undefined;
  private statusFilterSubscription: Subscription | undefined;

  constructor(private taskService: TaskService, private filtersService: FiltersService) {
    this.tasks = this.taskService.getTasks();
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
    this.addingNewTask = !this.addingNewTask;
  }

  refreshTaskList() {
    this.tasks = this.taskService.getTasks();
  }

  onTaskDeleted() {
    this.refreshTaskList();
  }

  onTaskAdded() {
    this.refreshTaskList();
    this.toggleForm();
  }

  // Filtering tasks //
  ngOnInit() {
    this.checkboxStateSubscription = this.filtersService.checkboxStateChange$.subscribe((isChecked: boolean) => {
      if (isChecked) {
        const today = this.filtersService.getTodayDate();
        this.tasks = this.taskService.getTasksByDate(today);
        this.refreshTaskList();
      }
    });

    this.dateFilterSubscription = this.filtersService.selectedDate$.subscribe((selectedDate: string | null) => {
      console.log(selectedDate)
      if (selectedDate) {
        this.tasks = this.taskService.getTasksByDate(selectedDate);
      } else {
        this.refreshTaskList();
      }
    });

    this.statusFilterSubscription = this.filtersService.statusChange$.subscribe((selectedStatus: string) => {
      console.log(selectedStatus);
      if (selectedStatus === 'Completed') {
        this.tasks = this.taskService.getCompletedTasks();
      } else if (selectedStatus === 'Pending') {
        this.tasks = this.taskService.getPendingTasks();
      } else {
        this.refreshTaskList();
      }
    });
  }

  ngOnDestroy() {
    if (this.checkboxStateSubscription) {
      this.checkboxStateSubscription.unsubscribe();
    }
    if (this.dateFilterSubscription) {
      this.dateFilterSubscription.unsubscribe();
    }
  }
}
