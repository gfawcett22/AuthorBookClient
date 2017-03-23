import { Injectable } from '@angular/core';
import {Http} from '@angular/http';

import { Author } from '../models/author';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Operator/add/do';
@Injectable()
export class AuthorService {
    private apiUrl = 'http://localhost:port/api/';
    constructor(private http: Http) {}
    getAuthors(): Observable<Author[]> {
        return this.http.get(this.apiUrl + 'authors')
            .map(res => res.json().data || {})
            .do(data => console.log('products', data))
            .catch(this.handleError);
    }
    handleError(error){
        // send error to server for logging
        console.log(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}