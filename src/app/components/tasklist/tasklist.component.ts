import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

import { ButtonComponent } from '../ui/button/button.component';
import { FormComponent } from '../ui/form/form.component';
import { TaskComponent } from './task/task.component';

import { Task } from '../../models/task.model';

import { TaskService } from '../../services/task-service.service';
import { SearchService } from '../../services/search-service.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent, FormComponent],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  showForm = false;
  addingNewTask = false;
  searchQuery = '';
  private subscription: Subscription | undefined;

  constructor(private taskService: TaskService, private searchService: SearchService) {}

  toggleForm() {
    this.showForm = !this.showForm;
    this.addingNewTask = !this.addingNewTask;
  }

  refreshTaskList() {
    this.subscription = this.taskService.filteredTasks$.subscribe((tasks) => {
      this.tasks = tasks;
    });
  }

  onTaskDeleted() {
    this.refreshTaskList();
  }

  onTaskCompleted() {
    this.refreshTaskList();
    console.log('Task completed, refreshed list:', this.tasks);
  }

  onTaskAdded() {
    this.refreshTaskList();
    this.toggleForm();
  }

  ngOnInit() {
    this.refreshTaskList();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}