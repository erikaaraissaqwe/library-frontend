import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosEmprestadosAdminComponent } from './livros-emprestados-admin.component';

describe('LivrosEmprestadosAdminComponent', () => {
  let component: LivrosEmprestadosAdminComponent;
  let fixture: ComponentFixture<LivrosEmprestadosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivrosEmprestadosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosEmprestadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
