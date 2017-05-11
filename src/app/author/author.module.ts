import { NgModule } from '@angular/core';

import { AuthorListComponent } from './author.list.component';
import { AuthorComponent } from 'app/author/author.component';
import { SharedModule } from 'app/shared/shared.module';
import { AuthorService } from 'app/services/authorService';
import { RouterModule } from '@angular/router';
import { BookListComponent } from 'app/book/book-list.component';
import { AuthorEditComponent } from 'app/author/author-edit.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {path: 'authors/:id/books', component: BookListComponent},
            {path: 'authorEdit/:id', component: AuthorEditComponent}
        ])
    ],
    exports: [AuthorListComponent],
    declarations: [
        AuthorListComponent,
        AuthorComponent,
        AuthorEditComponent
    ],
    providers: [AuthorService],
})
export class AuthorModule { }
