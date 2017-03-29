import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AuthorToCreateDto } from '../models/authorToCreateDto';
import { AuthorService } from '../services/authorService';

// import { NumberValidators } from '../shared/number.validator';
// import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './author-edit.component.html'
})
export class AuthorEditComponent implements OnInit, AfterViewInit, OnDestroy {
    AuthorService: any;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];
    authorId: number;
    pageTitle: string = 'Author Edit';
    errorMessage: string;
    authorForm: FormGroup;

    author: AuthorToCreateDto;
    private sub: Subscription;

    // Use with the generic validation message class
    displayMessage: { [key: string]: string } = {};
    private validationMessages: { [key: string]: { [key: string]: string } };
    // private genericValidator: GenericValidator;

    get books(): FormArray {
        return <FormArray>this.authorForm.get('books');
    }

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authorService: AuthorService) {

        // Defines all of the validation messages for the form.
        // These could instead be retrieved from a file or database.
        this.validationMessages = {
            authorName: {
                required: 'Author name is required.',
                minlength: 'Author name must be at least three characters.',
                maxlength: 'Author name cannot exceed 50 characters.'
            },
            genre: {
                required: 'Genre is required.'
            },
            dateOfBirth: {
                range: 'DOB is required',
                valid: 'DOB is not a valid date'
            }
        };

        // Define an instance of the validator for use with this form, 
        // passing in this form's set of validation messages.
        // this.genericValidator = new GenericValidator(this.validationMessages);
    }

    ngOnInit(): void {
        this.authorForm = this.fb.group({
            authorName: ['', [Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50)]],
            genre: ['', Validators.required],
            dateOfBirth: '',
            books: this.fb.array([])
        });

        // Read the author Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                console.log(id);
                this.getAuthor(id);
                this.authorId = id;
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        // let controlBlurs: Observable<any>[] = this.formInputElements
        //     .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        // Observable.merge(this.authorForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        //     this.displayMessage = this.genericValidator.processMessages(this.authorForm);
        // });
    }

    addBook(): void {
        this.books.push(this.createBook());
    }
    createBook(title = '', desc = '') {
        return this.fb.group({
            title: [title, Validators.required],
            description: [desc, [Validators.required, Validators.maxLength(50)]]
        });
    }
    getAuthor(id: number): void {
        this.authorService.getAuthor(id)
            .subscribe(
            (author: AuthorToCreateDto) => this.onAuthorRetrieved(author),
            (error: any) => this.errorMessage = <any>error
            );
    }

    onAuthorRetrieved(author: AuthorToCreateDto): void {
        if (this.authorForm) {
            this.authorForm.reset();
        }
        this.author = author;

        if (this.author.id === 0) {
            this.pageTitle = 'Add Author';
        } else {
            this.pageTitle = `Edit Author: ${this.author.name}`;
        }

        // Update the data on the form
        this.authorForm.patchValue({
            authorName: this.author.name,
            genre: this.author.genre,
            dateOfBirth: this.author.dateOfBirth
        });

        if (this.author.books && this.author.books.length > 0) {
            //let bookFormGroupArray: FormArray;
            this.author.books.forEach(element => {
                (<FormArray>this.authorForm.get('books')).push(this.createBook(element.title, element.description));
            });
            //this.authorForm.setControl('books', bookFormGroupArray);
        }
    }

    deleteAuthor(): void {
        if (this.author.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
        } else {
            if (confirm(`Really delete the author: ${this.author.name}?`)) {
                this.authorService.deleteAuthor(this.author.id)
                    .subscribe(
                    () => this.onSaveComplete(),
                    (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveAuthor(): void {
        if (this.authorForm.dirty && this.authorForm.valid) {
            // Copy the form values over the author object values
            // essentially allowing all updates to be put instead of patch
            const a = Object.assign({}, this.author, this.authorForm.value);
            console.log(a);
            this.authorService.saveAuthor(a)
                .subscribe(
                () => this.onSaveComplete(),
                (error: any) => this.errorMessage = <any>error
                );
        } else if (!this.authorForm.dirty) {
            this.onSaveComplete();
        }
    }

    onSaveComplete(): void {
        // Reset the form to clear the flags
        this.authorForm.reset();
        this.router.navigate(['/authors']);
    }
}