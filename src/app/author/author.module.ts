import { NgModule } from '@angular/core';

import { AuthorListComponent } from './author.list.component';
import { AuthorComponent } from 'app/author/author.component';
import { SharedModule } from 'app/shared/shared.module';
import { AuthorService } from 'app/services/authorService';
import { RouterModule } from '@angular/router';
import { BookListComponent } from 'app/book/book-list.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: 'authors/:authorId/books', component: BookListComponent}
        ])
        ],
    exports: [AuthorListComponent],
    declarations: [
        AuthorListComponent,
        AuthorComponent
    ],
    providers: [AuthorService],
})
export class AuthorModule { }
