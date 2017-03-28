import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Author } from '../models/author';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { BaseService } from 'app/services/baseService';

@Injectable()
export class AuthorService extends BaseService {
    constructor( @Inject('API_URL') private apiUrl: string, private http: Http) {super(); }
    getAuthors(): Observable<Author[]> {
        return this.http.get(this.apiUrl)
            .map(super.extractData)
            .do(data => console.log('authors', data))
            .catch(this.handleError);
    }
    getAuthor(id: number): Observable<Author> {
        // return this.http.get(this.apiUrl)
        //     .map(this.extractData)
        // when using api, wont have to filter list
        return this.getAuthors()
            .map(authors => authors.filter(author => author.id === id))
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    saveAuthor(author: Author): Observable<Author> {
        return this.getAuthors()
            .map(authors => authors.filter(author => author.id === author.id))
            .do(data => console.log(data))
            .catch(this.handleError);
    }
}
