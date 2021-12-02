import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/Book';
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
  book: Book;
  isUpdate = false;
  isBorrowed = false;
  title = "Cadastre um livro";

  constructor(
    private router: Router,
    private bookService: BookService,
    private routerActivated: ActivatedRoute
  ) {
   
  }

  ngOnInit(): void {
    this.initForm();
    if (this.router.url !== '/registerBook'){
      let id = this.routerActivated.snapshot.paramMap.get("id");
      this.setBookForUpdate(id);
      this.isUpdate=true;
      this.title = "Edite o livro";
    }
    else {
      this.isUpdate = false;
      this.title = "Cadastre um livro";
    }
  }

  setBookForUpdate(id: string): void {
    this.bookService.listOne(id).subscribe(
      (book) => {
        this.book = book;
        this.setCurso(this.book);
      },
      (err) => {
        this.router.navigate(["/error"]);
     }
   );
  }

  setCurso(book: Book): void {
    this.registerForm.setValue({
      title: book.title,
      author: book.author,
      dateOfPublication: book.dateOfPublication,
      pages: book.pages,
      isbn: book.isbn,
      image: book.image,
      resume: book.resume,
      borrowed: book.borrowed
    });
  }

  checkForm(): boolean {
    if(this.registerForm.valid){
      return true;
    }
    else{
      alert("Preencha com dados válidos!");
      return false;
    }
  }

  initForm() {
    this.registerForm = new FormGroup({
      title: new FormControl("", [Validators.required, Validators.minLength(3)]),
      author: new FormControl("", [Validators.required]),
      dateOfPublication: new FormControl("", [
        Validators.required,
      ]),
      pages: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+$')
      ]),
      isbn: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      image: new FormControl("", [
        Validators.required,
      ]),
      resume: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(1500),
      ]),
      borrowed: new FormControl(false, []),
    });
  }
  
  onSubmit(): void {
    if (this.checkForm()) {
      this.isLoading = true;
      const newBook = {
        title: this.registerForm.get('title').value,
        author: this.registerForm.get('author').value,
        dateOfPublication: this.registerForm.get('dateOfPublication').value,
        pages: this.registerForm.get('pages').value,
        isbn: this.registerForm.get('isbn').value,
        image: this.registerForm.get('image').value,
        resume: this.registerForm.get('resume').value,
        borrowed: this.isBorrowed,
      };

      if(!this.isUpdate){
        this.bookService
        .register(newBook)
        .subscribe(
          (data) => {
            alert("Cadastrado com sucesso")
            this.router.navigate(['/home']);
          },
          (err) => {
            this.msgServerError = err.error.msg;
            this.hasErrorServer = true;
            this.isLoading = false;
          }
        );
      }
      else{
        this.bookService
        .update(newBook, this.book._id)
        .subscribe(
          (data) => {
            alert("Atualizado com sucesso.");
            this.router.navigate(['/detailsBook/' + this.book._id]);
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

  onCheckChange(event){
    if(event.target.checked){
      this.isBorrowed = true;
    } else{
      this.isBorrowed = false;
    }
  }
}
