import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from 'src/app/models/User';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(
    private router: Router,
    private rota : ActivatedRoute,
    private Userservice: UserService
  ) { }

  userSelecionado : any;
  id = this.rota.snapshot.paramMap.get("id");
  
  getAluno(id: string): void {
    this.Userservice.listOne(id).pipe(first()).subscribe(
      (User) => {
        console.log(User);
        this.userSelecionado = User;
      },
      (err) => {
      alert(err.error.msg);
    }
  );
}
excluir(user: User) : void{
  let id = user._id;
    this.Userservice.delete(id).subscribe(
      (res) => {
      if (res.ok) {
        alert("O usuário foi deletado com sucesso");
        this.router.navigate(["/userList"]);
      }
    },
    (err) => {
      alert(err.error.msg);
    }
    );
}
  ngOnInit(): void {
    this.getAluno(this.id);
  }

}
