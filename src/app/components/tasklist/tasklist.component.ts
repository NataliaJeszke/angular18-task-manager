import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, Subscription } from 'rxjs';

import { ButtonComponent } from '../ui/button/button.component';
import { FormComponent } from '../ui/form/form.component';
import { TaskComponent } from './task/task.component';

import { Task } from '../../models/task.model';

import { TaskService } from '../../services/task-service.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent, FormComponent],
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css'],
})
export class TasklistComponent implements OnInit, OnDestroy {
  tasks$: Observable<Task[]> | undefined;

  showForm = false;
  addingNewTask = false;
  searchQuery = '';
  private subscription: Subscription | undefined;

  constructor(private taskService: TaskService) {}

  toggleForm() {
    this.showForm = !this.showForm;
    this.addingNewTask = !this.addingNewTask;
  }

  ngOnInit() {
    this.tasks$ = this.taskService.refreshTaskList();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
