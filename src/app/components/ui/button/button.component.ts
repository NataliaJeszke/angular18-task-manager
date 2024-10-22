import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() type: 'submit' | 'delete' | 'complete' | 'edit' = 'submit';
  @Input() isDisabled: boolean = false;

  get buttonClasses(): string {
    if (this.isDisabled && this.type === 'complete') {
      return 'bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed';
    }

    switch (this.type) {
      case 'submit':
        return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
      case 'delete':
        return 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded';
      case 'complete':
        return 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded';
      case 'edit':
        return 'bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded';
      default:
        return 'bg-gray-500 text-white font-bold py-2 px-4 rounded';
    }
  }
}