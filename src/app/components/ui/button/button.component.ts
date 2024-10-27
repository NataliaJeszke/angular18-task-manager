import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input() label = 'Button';
  @Input() type: 'submit' | 'delete' | 'complete' | 'edit' = 'submit';
  @Input() isDisabled = false;
  @Input() onClick?: () => void;

  getButtonClass(): string {
    if (this.isDisabled && this.type === 'complete') {
      return 'button-disabled';
    }

    switch (this.type) {
      case 'submit':
        return 'button-submit';
      case 'delete':
        return 'button-delete';
      case 'complete':
        return 'button-complete';
      case 'edit':
        return 'button-edit';
      default:
        return 'button-default';
    }
  }

  getButtonIcon(): string {
    switch (this.type) {
      case 'submit':
        return 'pi pi-plus';
      case 'delete':
        return 'pi pi-times';
      case 'complete':
        return 'pi pi-check';
      case 'edit':
        return 'pi pi-pencil';
      default:
        return '';
    }
  }
}
