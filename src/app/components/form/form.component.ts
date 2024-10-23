import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../models/task.model';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() date = '';

  @Output() taskAdded = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  task: Task = {
    title: '',
    description: '',
    completed: false,
    date: '',
    id: 0,
  };

  constructor(private taskService: TaskService) {}

  formatDate(date: string): string {
    const parts = date.split('-');
    if (parts.length !== 3) return date;

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
  }

  onSubmit() {
    if (this.task.title) {
      this.task.id = Date.now() + Math.floor(Math.random() * 10000);
      this.task.date = this.formatDate(this.task.date);
      this.taskService.addTask(this.task);
      this.task = {
        title: '',
        description: '',
        completed: false,
        date: '',
        id: 0,
      };

      this.taskAdded.emit();
      console.log('Task Added:', this.task);
    }
  }
}
