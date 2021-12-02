import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  form!: FormGroup;
  datos:[] = [];
  ls:[] = [];
  user:any={};
  listaAux:any[]=[]
  grupo:any ={}
  lista:[]=[]
  friend:any = {};
  
  verificar = true;
  verificarAgregado = true;
  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  ngOnInit(): void {

    this.buildForm();
    if(this.userService.getCambio() == null && this.userService.getBusquedaProfile() == null){
      alert("No puede acceder esta plantilla ya que no hay una busqueda");
      window.location.replace("/Dashboard");
    }else{
      var user ={
        'username':this.userService.getBusquedaProfile(),
      }
      this.user =JSON.parse(this.userService.getUser() || '{}');
      this.userService.getBusqueda(user).subscribe(
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
          this.datos = JSON.parse(JSON.stringify(this.friend || '{}'));
        }
      )

      if(this.userService.getGrupos() != null){
        this.grupo = JSON.parse(this.userService.getGrupos()|| '{}');
      }
    }
    
    if(this.userService.getCambio() == "2"){
       this.verificar = false;
    }else if (this.userService.getCambio() == "1"){
        this.verificarAgregado = false;
    }
  
    localStorage.removeItem('mensajes');
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username   : ['', [Validators.required]]
    });
  }

  guardar(){
    this.userService.getBusqueda(this.form.value).subscribe(
      (response)=>{
        if(response == "no se encontro"){
          alert("No se encontro el usuario")
        }else{
          this.datos = JSON.parse(JSON.stringify(response || '{}'));
          localStorage.setItem('busqueda',this.form.get('username')?.value);
          location.reload();
        }
      }
    )
  }

  cerrar(){
    if(this.userService.getCambio() == "2"){
      localStorage.removeItem('busqueda');
      localStorage.removeItem('cambio');
      window.location.replace("/configuracion/creacion-grupos");
    }else if (this.userService.getCambio() == "1"){
      localStorage.removeItem('busqueda');
      localStorage.removeItem('cambio');
      window.location.replace("/Dashboard");
    }
  }

  seleccionar(seleccionar:any,id:any){

    if(id == this.user['id']){
      alert("no tienes acceso a estos botones")
    }else{
      this.userService.getBusquedaFriends(Number(this.user['id']),Number(id)).subscribe(
        (res)=>{
          if(res == "no se encontro"){

            if (seleccionar == 1){
              alert("no son amigos")
              var friend = {
                'idFriends':String(id),
                'check':0,
              }

              this.userService.getFriendSolicitud(Number(this.user['id']),friend).subscribe(
                (response)=>{
                  if(response == "se creo el usuario"){
                    alert("ya se envio la solicitud a tu amigo/conocido");
                  }else{
                    alert("no se envio la solicitud a tu amigo/conociso");
                  }
                }
              )
            }else if (seleccionar == 2){
              alert("lo siento no son amigos para enviar mensaje")
            } 
          }else{
            if (seleccionar == 1){
              alert("lo siento no se puede enviar otro solicitud ya que son amigos")
            }else if (seleccionar == 2){
              localStorage.setItem('mensajes',JSON.stringify(res));
              window.location.replace("/Dashboard");
            }
          }
        }
      )

    }
    
  }

  guardarParticipante(id:any){
    var participante={
      "user":Number(id),
      "chat":this.grupo['id']
    }
    console.log(participante)
    this.userService.getAgregarParticipanteGrupo(participante).subscribe(
      (response)=>{
        console.log(response)

        if(response == "ya se creo ese usuario"){
          alert("ese usuario ya esta agrego al grupo")
        }else{
          if(response == "ya se agrego"){
            alert("ya se agrego el usuario al grupo")
          }else{
            alert("lo sentimos hubo un error sigue intentando")
          }
        }
      }
    )
  }
  
}
