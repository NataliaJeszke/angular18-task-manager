import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task-service.service';

import { ButtonComponent } from '../../ui/button/button.component';
import { FormComponent } from '../../ui/form/form.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ButtonComponent, FormComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  showForm = false;

  @Input({ required: false }) description = '';
  @Input() date = '';
  @Input()
  id!: number;
  @Input()
  completed!: boolean;

  // New Angular Signal //
  title = input.required<string>();

  constructor(private taskService: TaskService) {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onDelete() {
    this.taskService.removeTask(this.id);
  }

  onComplete() {
    this.taskService.completeTask(this.id);
  }
}
