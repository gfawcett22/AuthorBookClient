import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemAuthorService implements InMemoryDbService {
    createDb() {
        const authors = [
            {
                'id': 1,
                'name': 'Test author',
                'genre': 'Nonfiction',
                'age': 45
            },
            {
                'id': 2,
                'name': 'Samurai Jack',
                'genre': 'Fiction',
                'age': 64,
                'books': [
                    {
                        'id': 1,
                        'title': 'Fighting Aku',
                        'description': 'My personal fight with aku',
                        'genre': 'Nonfiction',
                        'authorId': 2
                    }
                ]
            },
            {
                'id': 3,
                'name': 'Kobe Bryant',
                'genre': 'Mystery',
                'age': 26
            },
            {
                'id': 5,
                'name': 'Deborah Kurata',
                'genre': 'Nonfiction',
                'age': 45
            },
            {
                'id': 9,
                'name': 'Jack Frost',
                'genre': 'Fiction',
                'age': 60
            },
            {
                'id': 10,
                'name': 'Joe Shmow',
                'genre': 'Mystery',
                'age': 26
            }
        ];
        
        return { authors };
    }
}