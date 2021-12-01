import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.css']
})
export class RegisterBookComponent implements OnInit {
  registerForm: FormGroup;
  isLoading = false;
  hasErrorServer = false;
  msgServerError: string;

  constructor(
    private router: Router,
    private bookService: BookService
  ) {
   
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      author: new FormControl("", [Validators.required]),
      dateOfPublication: new FormControl("", [
        Validators.required,
      ]),
      pages: new FormControl("", [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      isbn: new FormControl("", [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(16),
      ]),
      image: new FormControl("", [
        Validators.required,
      ]),
      resume: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(500),
      ]),
    });
  }
  
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      const newBook = {
        title: this.registerForm.get('title').value,
        author: this.registerForm.get('author').value,
        dateOfPublication: this.registerForm.get('dateOfPublication').value,
        pages: this.registerForm.get('pages').value,
        isbn: this.registerForm.get('isbn').value,
        image: this.registerForm.get('image').value,
        resume: this.registerForm.get('resume').value,
      };

      this.bookService
        .register(newBook)
        .subscribe(
          (data) => {
            console.log(data);
            alert("cadastrado com sucesso")
            this.router.navigate(['/home']);
          },
          (err) => {
            this.msgServerError = err.error.msg;
            this.hasErrorServer = true;
            this.isLoading = false;
          }
        );
    }
  }
}
