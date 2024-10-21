import { Component, Input, input } from '@angular/core';
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

  // New Angular Signal //
  title = input.required<string>();
}
