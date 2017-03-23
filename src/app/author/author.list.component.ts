import { Component, OnInit } from '@angular/core';
import { Author } from '../models/author';
import { AuthorService } from 'app/services/authorService';
@Component({
    moduleId: module.id,
    selector: 'app-author-list',
    template: `
        <div class='container'>
        <app-author *ngFor='let author of authors' [author]='author'></app-author>
        </div>
    `
})
export class AuthorListComponent implements OnInit {
    authors: Author[];
    constructor(private authorService: AuthorService) { }

    ngOnInit() {
        this.authorService.getAuthors()
        .subscribe(authors => this.authors = authors, err => console.log(err));
     }
}