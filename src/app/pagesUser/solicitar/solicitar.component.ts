import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-solicitar',
  templateUrl: './solicitar.component.html',
  styleUrls: ['./solicitar.component.css']
})
export class SolicitarComponent implements OnInit {

  constructor(private userService : UserService) { }
  user:any={};
  friend:any = {};
  lista : [] = [];

  ngOnInit(): void {
    var friends = {
      'check':0
    }
    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.userService.getFriendEspera(Number(this.user['id']),friends).subscribe(
      (response)=>{
       
        this.friend = response ;
        for (let i in this.friend){
           if (this.friend[i].photo == null){
             this.friend[i].photo = "assets/imagen/imagen2.png";
           } else{
             var photo = this.userService.getUrl()+this.friend[i].photo;
             this.friend[i].photo = photo;
           }
        }
        this.lista = this.friend;
        console.log(this.lista)
      },(error)=>{ console.log('error',error)}

    )

  }

  borrar(id:any){
    this.userService.getFriendDeleteEditar(Number(id)).subscribe(
      (response)=>{
       if(response == "ya se pudo eliminar"){
        alert("Ya se cancelo esa solicitud")
        location.reload();
       }
      },(error)=>{ console.log('error',error)}

    )
  }

  agregar(id:any){
    var friends = {
      'idFriends':String(id),
      'check':1
    }

    this.userService.getFriendEsperaEditar(Number(this.user['id']),friends).subscribe(
      (response)=>{
       if(response == "ya se pudo editar"){
        alert("ya son amigos")
        location.reload();
       }
      },(error)=>{ console.log('error',error)}

    )
    
  }

}
