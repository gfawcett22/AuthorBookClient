export enum Genre {Fiction, NonFiction, Romance, Thriller, Mystery};
export interface Author{
    name: string;
    genre: Genre;
    age: number;
}