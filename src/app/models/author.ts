import { Book } from 'app/models/book';

export interface Author {
    id: number;
    name: string;
    genre: string;
    dateOfBirth: string;
    age: number;
    books: Book[];
}
