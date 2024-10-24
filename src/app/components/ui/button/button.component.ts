import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'submit' | 'delete' | 'complete' | 'edit' = 'submit';
  @Input() isDisabled = false;

  get buttonClasses(): string {
    if (this.isDisabled && this.type === 'complete') {
      return 'bg-gray-500 text-white font-bold py-2 px-4 rounded cursor-not-allowed';
    }

    switch (this.type) {
      case 'submit':
        return 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded';
      case 'delete':
        return 'bg-[#e94e4e] hover:bg-[#c13c3c] text-white font-bold py-2 px-4 rounded';
      case 'complete':
        return 'bg-[#a8b7dd] hover:bg-[#6b85c4] text-white font-bold py-2 px-4 rounded';
      case 'edit':
        return 'border border-[#a8b7dd] bg-white text-[#a8b7dd] hover:bg-[#6b85c4] hover:text-white font-bold py-2 px-4 rounded';
      default:
        return 'bg-gray-500 text-white font-bold py-2 px-4 rounded';
    }
  }
}
