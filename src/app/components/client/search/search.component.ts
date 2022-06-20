import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  show : boolean;
  constructor() {
    this.show = false;
   }

  ngOnInit(): void {
  }

  toggleDropdown() {
    this.show = !this.show;
  }

}
