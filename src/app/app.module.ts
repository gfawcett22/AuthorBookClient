import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/Operator/add/do';
import 'rxjs/Operator/add/map';
import 'rxjs/Operator/add/throw';

import { AppComponent } from './app.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {LoginService} from './services/loginService';
import { AuthorComponent } from './author/author.component';
import { AuthorService } from 'app/services/authorService';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    AuthorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    LoginService,
    AuthorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
