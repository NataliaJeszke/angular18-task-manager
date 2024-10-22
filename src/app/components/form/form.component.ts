import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task-service.service';
import { Task } from '../../models/task.model';
import { ButtonComponent } from "../ui/button/button.component";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  @Output() taskAdded = new EventEmitter<void>();
  
  task: Task = {
    title: '',
    description: '',
    completed: false,
    date: '',
    id: 0
  }

  constructor(private taskService: TaskService) {}

  onSubmit(){
    if(this.task.title){
      this.task.id = Date.now() + Math.floor(Math.random() * 10000);
      this.taskService.addTask(this.task);
      this.task = { title: '', description: '', completed: false, date: '', id: 0 };

      this.taskAdded.emit();
    }
  }  
}
