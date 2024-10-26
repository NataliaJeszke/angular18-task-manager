import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { TasklistComponent } from './components/tasklist/tasklist.component';
import { TaskComponent } from './components/tasklist/task/task.component';
import { FilterComponent } from "./components/filter/filter.component";
import { SearchComponent } from "./components/search/search.component";
import { MenuComponent } from "./components/menu/menu.component";

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TasklistComponent, TaskComponent, FilterComponent, SearchComponent, MenuComponent, ButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-task-manager';
}
