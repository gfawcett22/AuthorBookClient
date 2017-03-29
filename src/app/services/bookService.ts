import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from 'app/services/baseService';

@Injectable()
export class BookService extends BaseService {

    constructor(@Inject('API_URL') private apiUrl: string, private http: Http) { super(); }

    getBooksForAuthor(authorId: number) {
        const url = this.apiUrl + '/' + authorId + '/books';
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }
    // OVERRIDE BASE SERVICE TO GET BOOKS ATTRIBUTE FROM RESPONSE. NOT NEEDED WHEN RUNNING SERVER
    extractData(response: Response) {
        const body = response.json();
        return body.data.books || {};
    }
}