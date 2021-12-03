import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button-edit',
  templateUrl: './button-edit.component.html',
  styleUrls: ['./button-edit.component.css']
})
export class ButtonEditComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  edit(): void {
    this.router.navigate(['/edit']);
  }
  
  ngOnInit(): void {
  }

}
