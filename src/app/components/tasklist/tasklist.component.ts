import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../ui/button/button.component';
import { TaskComponent } from './task/task.component';
import { FormComponent } from '../form/form.component';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task-service.service';
import { FiltersService } from '../../services/filters-service.service';

@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent, FormComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
})
export class TasklistComponent {
  tasks: Task[] = [];
  showForm = false;
  addingNewTask = false;

  constructor(private taskService: TaskService) {
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

  onTaskAdded(){
    this.refreshTaskList();
    this.toggleForm();
  }

  // Filtering tasks //

}
