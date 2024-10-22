import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../ui/button/button.component';
import { TaskComponent } from '../ui/task/task.component';
import { FormComponent } from '../form/form.component';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task-service.service';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent, FormComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
})
export class TasklistComponent {
  tasks: Task[] = [];
  showForm: boolean = false;

  constructor(private taskService: TaskService) {
    this.tasks = this.taskService.getTasks();
  }

  removeTask(id: number) {
    this.taskService.removeTask(id);
    this.tasks = this.taskService.getTasks();
  }

  completeTask(id: number) {
    this.taskService.completeTask(id);
    this.tasks = this.taskService.getTasks();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  refreshTaskList() {
    this.tasks = this.taskService.getTasks();
  }
}
