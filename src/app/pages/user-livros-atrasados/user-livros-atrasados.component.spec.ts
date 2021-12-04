import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLivrosAtrasadosComponent } from './user-livros-atrasados.component';

describe('UserLivrosAtrasadosComponent', () => {
  let component: UserLivrosAtrasadosComponent;
  let fixture: ComponentFixture<UserLivrosAtrasadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserLivrosAtrasadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLivrosAtrasadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
