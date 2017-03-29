import { NgModule } from '@angular/core';

import { BookListComponent } from 'app/book/book-list.component';
import { BookService } from 'app/services/bookService';
import { SharedModule } from 'app/shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: 'authors/:id/books', component: BookListComponent}
        ])
        ],
    exports: [BookListComponent],
    declarations: [BookListComponent],
    providers: [BookService],
})
export class BookModule { }
