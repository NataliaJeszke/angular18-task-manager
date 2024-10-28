import { Component, Renderer2, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-toggle',
  standalone: true,
  imports: [ToggleButtonModule, CommonModule, FormsModule],
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent implements OnInit {
  isDarkTheme = false;
  themeLinkElement!: HTMLLinkElement;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    this.isDarkTheme = savedTheme === 'theme-dark';
    this.setTheme(this.isDarkTheme ? 'theme-dark' : 'theme-light');
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'theme-dark' : 'theme-light';
    this.setTheme(theme);
    localStorage.setItem('theme', theme);
  }

  private setTheme(theme: string) {
    if (!this.themeLinkElement) {
      this.themeLinkElement = this.renderer.createElement('link');
      this.themeLinkElement.rel = 'stylesheet';
      this.themeLinkElement.type = 'text/css';
      this.renderer.appendChild(document.head, this.themeLinkElement);
    }
    
    this.themeLinkElement.href = `${theme}.css`;
  }
}
