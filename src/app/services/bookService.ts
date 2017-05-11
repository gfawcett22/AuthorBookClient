import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BaseService } from 'app/services/baseService';
//import { API_URL } from 'app/app.module';

@Injectable()
export class BookService extends BaseService {

    constructor(@Inject('API_URL') private apiUrl: string, private http: Http) { super(); }

    getBooksForAuthor(authorId: number) {
        const url = this.apiUrl + '/' + authorId + '/books';
        return this.http.get(url)
            .map(super.extractData)
            // .do(data => console.log(data))
            .catch(super.handleError);
    }
}
