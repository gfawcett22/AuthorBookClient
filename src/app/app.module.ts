import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken, OpaqueToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';


import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import {LoginService} from './services/loginService';
import { AuthorComponent } from './author/author.component';
import { AuthorService } from 'app/services/authorService';
import { AuthorListComponent } from 'app/author/author.list.component';
import { InMemAuthorService } from 'app/services/InMemAuthorApi';
import { AuthorModule } from 'app/author/author.module';
import { BookModule } from 'app/book/book.module';
import { BookListComponent } from 'app/book/book-list.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // InMemoryWebApiModule.forRoot(InMemAuthorService, {delay: 500}),
    RouterModule.forRoot([
      { path: 'authors', component: AuthorListComponent },
      { path: '', redirectTo: 'authors', pathMatch: 'full' },
    ]),
    AuthorModule,
    BookModule
  ],
  providers: [
    {provide: 'API_URL', useValue: 'http://localhost:59267/api/authors'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
