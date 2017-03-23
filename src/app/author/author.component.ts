import { Component, OnInit, Input } from '@angular/core';
import { Author } from '../models/author';
@Component({
  selector: 'app-author',
  template: `
    <div class='row'>
      <span>{{this.author.name}}</span>
      <span>{{this.author.genre}}</span>
      <span>{{this.author.age}}</span>
    </div>
  `
})
export class AuthorComponent implements OnInit {
  @Input() author: Author;
  constructor() { }

  ngOnInit() {
  }

}
