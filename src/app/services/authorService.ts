import { Injectable, Inject } from '@angular/core';
import { Http,Headers, Response, RequestOptions } from '@angular/http';

import { Author } from '../models/author';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { BaseService } from 'app/services/baseService';
// import { API_URL } from 'app/app.module';

@Injectable()
export class AuthorService extends BaseService {
    constructor( @Inject('API_URL') private apiUrl: string, private http: Http) { super(); }
    getAuthors(): Observable<Author[]> {
        console.log(this.apiUrl);
        return this.http.get(this.apiUrl)
            .map(super.extractData)
            // .do(data => console.log(data))
            .catch(super.handleError);
    }
    getAuthor(id: number): Observable<Author> {
        if (id === 0) {
            return Observable.of(this.initializeAuthor());
        }
        const url = this.apiUrl + '/' + id;
        console.log(url);
        return this.http.get(url)
            .map(super.extractData)
            .do((author: Author) => {
                // remove the time from the string cause I cant seem to find a way to do it on the backend. Always returns (date)T00:00:00
                const dateStringValue = author.dateOfBirth.split('T');
                author.dateOfBirth = dateStringValue[0];
            })
            // .do(data => console.log(data))
            .catch(super.handleError);
    }
    saveAuthor(author: Author): Observable<Author> {
        const headers = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: headers });

        if (author.id === 0) {
            return this.createAuthor(author);
        }
        const url = this.apiUrl + '/' + author.id;
        return this.http.put(url, author, headers)
            .catch(super.handleError);
    }
    createAuthor(author: Author): Observable<Author> {
        author.id = undefined;
        return this.http.post(this.apiUrl, author)
                .map(this.extractData)
                .catch(super.handleError);
    }
    deleteAuthor(id: number): Observable<Response> {
        return this.http.delete(this.apiUrl + '/' + id);
    }

    initializeAuthor(): Author {
        return {
            id: 0,
            name: null,
            genre: null,
            age: null,
            dateOfBirth: null,
            books: []
        };
    }
}
