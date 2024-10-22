import { Component, Input, input, Output, EventEmitter } from '@angular/core';

import { TaskService } from '../../../services/task-service.service';

import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input({ required: false }) description: string = '';
  @Input() date: string = '';
  @Input() id: number = 0;
  @Input() completed: boolean = false

  // New Angular Signal //
  title = input.required<string>();

  @Output() taskDeleted = new EventEmitter<void>();

  constructor(private taskService: TaskService) {}

  onDelete() {
    this.taskService.removeTask(this.id);
    this.taskDeleted.emit();
  }

  onComplete() {
    this.taskService.completeTask(this.id);
    this.completed = true;
  }

}
