import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toast } from 'bulma-toast';
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
  
  getUser(id: string): void {
    this.Userservice.listOne(id).pipe(first()).subscribe(
      (User) => {
        this.userSelecionado = User;
      },
      (err) => {
        toast({
          message: err.error.msg,
          type: 'is-danger',
          dismissible: true,
          duration: 4000,
          position: 'bottom-center'
        });
    }
  );
}

excluir(user: User) : void{
  let id = user._id;
  if (confirm("Deseja excluir: " + user.name + "?")) {
    this.Userservice.delete(id).subscribe(
      (res) => {
      if (res.ok) {
        toast({
          message: 'O usuário foi deletado com sucesso.',
          type: 'is-success',
          dismissible: true,
          duration: 4000,
          position: 'bottom-center'
        });
        this.router.navigate(["/userList"]);
      }
    },
    (err) => {
      toast({
        message: err.error.msg,
        type: 'is-danger',
        dismissible: true,
        duration: 4000,
        position: 'bottom-center'
      });
    }
    );
  }
}
  ngOnInit(): void {
    this.getUser(this.id);
  }

}
