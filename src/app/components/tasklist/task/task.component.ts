import { Component, Input, input, Output, EventEmitter } from '@angular/core';
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
  @Input() id = 0;
  @Input() completed = false;

  // New Angular Signal //
  title = input.required<string>();

  @Output() taskDeleted = new EventEmitter<void>();
  @Output() taskCompleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  toggleForm() {
    this.showForm = !this.showForm;
  }

  onDelete() {
    this.taskService.removeTask(this.id);
    this.taskDeleted.emit();
  }

  onComplete() {
    this.taskService.completeTask(this.id);
    this.taskCompleted.emit();
    console.log('Task completed', this.completed, this.id, this.title);
  }

  onSave(updatedTask: { title: string; description: string; date: string }) {
    this.taskService.editTask({
      id: this.id,
      ...updatedTask,
      completed: this.completed,
    });
    this.toggleForm();
  }
}
