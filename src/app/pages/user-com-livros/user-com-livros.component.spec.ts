import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComLivrosComponent } from './user-com-livros.component';

describe('UserComLivrosComponent', () => {
  let component: UserComLivrosComponent;
  let fixture: ComponentFixture<UserComLivrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserComLivrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComLivrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
