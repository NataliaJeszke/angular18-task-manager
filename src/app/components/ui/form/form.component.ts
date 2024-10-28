import {
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import { TaskService } from '../../../services/task-service.service';
import { Task } from '../../../models/task.model';
import { ButtonComponent } from '../button/button.component';

import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonComponent, InputTextModule, CalendarModule, InputTextareaModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnChanges {
  @Input() title = '';
  @Input() description = '';
  @Input() date = '';
  @Input() newTask = false;

  @Output() taskAdded = new EventEmitter<void>();
  @Output() save = new EventEmitter<{
    title: string;
    description: string;
    date: string;
  }>();

  formGroup: FormGroup;
  task: Task = {
    title: '',
    description: '',
    completed: false,
    date: '',
    id: 0,
  };

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      title: [''],
      description: [''],
      date: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title'] || changes['description'] || changes['date']) {
      this.formGroup.patchValue({
        title: this.title,
        description: this.description,
        date: this.date,
      });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.task.id = Date.now() + Math.floor(Math.random() * 10000);
      this.task.date = formatDate(this.formGroup.value.date, 'dd-MM-yyyy', 'en-US');
      this.task.title = this.formGroup.value.title;
      this.task.description = this.formGroup.value.description;

      this.taskService.addTask(this.task);
      this.resetTask();
      this.taskAdded.emit();
      this.newTask = false;
    }
  }

  onSave() {
    this.save.emit(this.formGroup.value);
  }

  resetTask() {
    this.formGroup.reset();
    this.task = {
      title: '',
      description: '',
      completed: false,
      date: '',
      id: 0,
    };
  }
}
