import { Component } from '@angular/core';

@Component({
  selector: 'app-root',  
  styleUrls: ['./app.component.css'],
  template: `
  <div>
        <nav class='navbar navbar-default'>
            <div class='container-fluid'>
                <a class='navbar-brand'>{{pageTitle}}</a>
                <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['/authors']">Author List</a></li>
                    <li><a [routerLink]="['/authorEdit/0']">Add Author</a></li>
                </ul>
            </div>
        </nav>
        <div class='container'>
            <router-outlet></router-outlet>
        </div>
     </div>
  `
})
export class AppComponent {
  pageTitle = 'AuthorBookApp';
}
