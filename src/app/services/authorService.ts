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
            // .do(data => console.log(data))
            .catch(this.handleError);
    }
    getAuthor(id: number): Observable<Author> {
        let url = this.apiUrl + '/' + id;
        console.log(url);
        return this.http.get(url)
            .map(this.extractData)
            // .do(data => console.log(data))
            .catch(this.handleError);
    }
    saveAuthor(author: Author): Observable<Author> {
        let url = this.apiUrl + '/' + author.id;
        return this.http.put(url, author, null)
            // .map(authors => authors.filter(author => author.id === author.id))
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    deleteAuthor(id: number): Observable<Response> {
        return this.http.delete(this.apiUrl + '/' + id);
    }
}
