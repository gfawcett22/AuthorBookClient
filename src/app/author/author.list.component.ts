import { Component, OnInit, Inject } from '@angular/core';
import { Author } from '../models/author';
import { AuthorService } from 'app/services/authorService';
@Component({
    moduleId: module.id,
    selector: 'app-author-list',
    templateUrl: './author.list.component.html'
})
export class AuthorListComponent implements OnInit {
    authors: Author[];
    constructor(private authorService: AuthorService) { }

    ngOnInit() {
        this.getAuthors();
     }
     getAuthors() {
        this.authorService.getAuthors()
            .subscribe(authors => this.authors = authors,
                err => console.log(err));
     }
     getAuthor(id: number){
         this.authorService.getAuthor(id)
            .subscribe(author => console.log(author),
                err => console.log(err));
     }
}