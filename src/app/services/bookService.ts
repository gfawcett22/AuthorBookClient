import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { BaseService } from 'app/services/baseService';

@Injectable()
export class BookService extends BaseService {

    constructor(@Inject('API_URL') private apiUrl: string,private http: Http) { super(); }

    getBooksForAuthor(authorId: number) {
        const url = this.apiUrl + '/' + authorId + '/books';
        return this.http.get(url)
            .map(this.extractData)
            .do(data => console.log(data))
            .catch(this.handleError);
    }
}