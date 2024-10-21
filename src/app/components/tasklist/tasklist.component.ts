import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../ui/button/button.component';
import { TaskComponent } from '../ui/task/task.component';

import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task-service.service';


@Component({
  selector: 'app-tasklist',
  standalone: true,
  imports: [CommonModule, ButtonComponent, TaskComponent],
  templateUrl: './tasklist.component.html',
  styleUrl: './tasklist.component.css',
})
export class TasklistComponent {
  tasks: Task[] = [];

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
}
