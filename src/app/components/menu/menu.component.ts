import { Component } from '@angular/core';
import { FilterComponent } from "../filter/filter.component";
import { SocialComponent } from "../ui/social/social.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FilterComponent, SocialComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

}
