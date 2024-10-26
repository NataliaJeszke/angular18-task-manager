import { Component } from '@angular/core';
import { SearchService } from '../../services/search-service.service';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchQuery = '';

  constructor(private searchService: SearchService) {}

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target) {
      this.searchQuery = target.value;
      if (this.searchQuery === '') {
        this.searchService.setSearchQuery('');
      }
    }
  }

  onSearch(): void {
    this.searchService.setSearchQuery(this.searchQuery);
  }
}
