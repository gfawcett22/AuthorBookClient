import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router  } from '@angular/router';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Author } from '../models/author';
import { AuthorService } from '../services/authorService';

// import { NumberValidators } from '../shared/number.validator';
// import { GenericValidator } from '../shared/generic-validator';

@Component({
    templateUrl: './author-edit.component.html'
})
export class AuthorEditComponent implements OnInit, AfterViewInit, OnDestroy {
        AuthorService: any;
    @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

    pageTitle: string = 'Author Edit';
    errorMessage: string;
    authorForm: FormGroup;

    author: Author;
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
            gemre: {
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

        // Read the product Id from the route parameter
        this.sub = this.route.params.subscribe(
            params => {
                let id = +params['id'];
                this.getAuthor(id);
            }
        );
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    ngAfterViewInit(): void {
        // Watch for the blur event from any input element on the form.
        let controlBlurs: Observable<any>[] = this.formInputElements
            .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

        // Merge the blur event observable with the valueChanges observable
        // Observable.merge(this.authorForm.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
        //     this.displayMessage = this.genericValidator.processMessages(this.authorForm);
        // });
    }

    addBook(): void {
        this.books.push(new FormControl());
    }

    getAuthor(id: number): void {
        this.authorService.getAuthor(id)
            .subscribe(
                (author: Author) => this.onAuthorRetrieved(author),
                (error: any) => this.errorMessage = <any>error
            );
    }

    onAuthorRetrieved(author: Author): void {
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
        // this.authorForm.setControl('books', this.fb.array(this.author.books || []));
    }

    deleteAuthor(): void {
        if (this.author.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete();
       } else {
            if (confirm(`Really delete the product: ${this.author.name}?`)) {
                this.AuthorService.deleteProduct(this.author.id)
                    .subscribe(
                        () => this.onSaveComplete(),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    saveProduct(): void {
        if (this.authorForm.dirty && this.authorForm.valid) {
            // Copy the form values over the product object values
            let p = Object.assign({}, this.author, this.authorForm.value);

            this.AuthorService.saveAuthor(p)
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
        this.router.navigate(['/products']);
    }
}