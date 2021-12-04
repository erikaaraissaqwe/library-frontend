import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrosAtrasadosAdminComponent } from './livros-atrasados-admin.component';

describe('LivrosAtrasadosAdminComponent', () => {
  let component: LivrosAtrasadosAdminComponent;
  let fixture: ComponentFixture<LivrosAtrasadosAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivrosAtrasadosAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrosAtrasadosAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
