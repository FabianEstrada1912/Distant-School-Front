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
  foto:any;
  descripcion:any;

  ngOnInit(): void {
    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.userService.getProfile(Number(this.user['id'])).subscribe(
      (response)=>{
        if(response['photo'] == null){
          this.foto = "assets/imagen/imagen2.png";
        }else{
          this.foto =this.userService.getUrl()+response['photo'];
        }
        var profile = {
          "id":response['id'],
          "descripcion":response['descripcion'],
          "idUser":response['idUser'],
          "photo":response['photo']
        }
        localStorage.setItem('descripcion',JSON.stringify(profile));
        this.descripcion = response['descripcion'];
      },(error)=>{ console.log('error',error)}
    );
  }

}
