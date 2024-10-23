import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { formatDate } from '@angular/common';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../models/task.model';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  @Input() title = '';
  @Input() description = '';
  @Input() date = '';

  @Output() taskAdded = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    title: string;
    description: string;
    date: string;
  }>();
  @Output() cancel = new EventEmitter<void>();

  task: Task = {
    title: '',
    description: '',
    completed: false,
    date: '',
    id: 0,
  };

  constructor(private taskService: TaskService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title'] || changes['description'] || changes['date']) {
      this.task.title = this.title;
      this.task.description = this.description;
      this.task.date = this.date;
    }
  }

  onSubmit() {
    if (this.task.title) {
      this.task.id = Date.now() + Math.floor(Math.random() * 10000);
      this.task.date = formatDate(this.task.date, 'dd-MM-yyyy', 'en-US');
      this.taskService.addTask(this.task);
      this.resetTask();
      this.taskAdded.emit();
    }
  }

  onSave() {
    this.save.emit({
      title: this.task.title,
      description: this.task.description,
      date: formatDate(this.task.date, 'dd-MM-yyyy', 'en-US'),
    });
  }

  resetTask() {
    this.task = {
      title: '',
      description: '',
      completed: false,
      date: '',
      id: 0,
    };
  }
}
