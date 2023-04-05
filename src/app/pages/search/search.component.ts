import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {


  searchValue: string = '';


  @Output()
  searchTextChange: EventEmitter<string> = new EventEmitter<string>();


  onSearchTextChange() {
    this.searchTextChange.emit(this.searchValue);
  }

}
