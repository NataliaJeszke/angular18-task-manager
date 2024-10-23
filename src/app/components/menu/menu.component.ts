import { Component } from '@angular/core';
import { FilterComponent } from "../filter/filter.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
