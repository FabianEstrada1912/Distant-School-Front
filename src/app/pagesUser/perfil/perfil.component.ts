import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private userService : UserService) { }
  user:any={};
  data :any={};
  descripcion:any;

  ngOnInit(): void {
    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.userService.getProfile(Number(this.user['id'])).subscribe(
      (response)=>{
        localStorage.setItem('descripcion',JSON.stringify(response));
        this.descripcion = response['descripcion'];
      },(error)=>{ console.log('error',error)}
    );
  }

}
