import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLivrosEmprestadosComponent } from './user-livros-emprestados.component';

describe('UserLivrosEmprestadosComponent', () => {
  let component: UserLivrosEmprestadosComponent;
  let fixture: ComponentFixture<UserLivrosEmprestadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLivrosEmprestadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLivrosEmprestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
