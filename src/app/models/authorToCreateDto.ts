import {Author} from './author';

export interface AuthorToCreateDto extends Author{
    dateOfBirth: Date;
}