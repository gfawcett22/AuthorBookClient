import { Component, OnInit } from '@angular/core';
import { BookService } from 'app/services/bookService';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Book } from 'app/models/book';


@Component({
    moduleId: module.id,
    selector: 'app-book-list',
    templateUrl: 'book-list.component.html'
})

export class BookListComponent implements OnInit {
    books: Book[];
    private sub: Subscription;

    constructor(private bookService: BookService,
        private route: ActivatedRoute,
        private router: Router) { }

    ngOnInit() {
        // subscribe to route id changes
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getBooksForAuthor(id);
            }
        );
    }

    getBooksForAuthor(authorId: number) {
        this.bookService.getBooksForAuthor(authorId)
            .subscribe(books => this.books = books,
                err => console.log('error getting books for author', err));
    }
}