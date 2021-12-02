import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

    form!: FormGroup;
    formGrup!: FormGroup;
    verificar = true;
    buttonVerifi = false;
    foto :any;
    fotoAuxiliar:any;
    images:any;
    user:any={};
    grupo:any = {}
    lista : [] = [];
    friend:any = {};

    constructor(private formBuilder: FormBuilder,private userService : UserService) { }

    ngOnInit(): void {
      this.user =JSON.parse(this.userService.getUser() || '{}');
      this.buildForm();
      this.grupos();
      this.verificar = false;
      if(this.userService.getGrupos() != null){
        this.verificar = true;
        this.buttonVerifi = true;
        this.grupo = JSON.parse(this.userService.getGrupos()|| '{}');
      
        this.userService.getVerParticipanteGrupo({"chat":Number(this.grupo['id'])}).subscribe(
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
            this.lista = JSON.parse(JSON.stringify(this.friend || '{}'));
          }
        )
      }else{
       
      }
      this.foto = "assets/imagen/imagen2.png";
    }

    private buildForm() {
      this.form = this.formBuilder.group({
        username   : ['', [Validators.required]]
      });
    }

    private grupos(){
      this.formGrup= this.formBuilder.group({
         name : ['', [Validators.required]],
         descripcion :  ['', [Validators.required]],
         user :  [Number(this.user['id']), [Validators.required]],
      });
    }

    guardar(){
      this.userService.getBusqueda(this.form.value).subscribe(
        (response)=>{
          if(response == "no se encontro"){
            alert("No se encontro el usuario")
          }else{
            var name:any = {};
            localStorage.setItem('busqueda',this.form.get('username')?.value);
            localStorage.setItem('cambio',"2");
            window.location.replace("/busqueda");
          }
        }
      )
    }

    guardarGrupo(){
      if (this.images == null){
        alert("tienes que poner un imagen")
      }else{
        const formData = new FormData();
        var id :any
        formData.append('file',this.images);
        this.userService.getCrearGrupo(this.formGrup.value).subscribe(
           (response)=>{
             this.grupo = response;
             console.log(this.grupo)
             id = response['id'];
             localStorage.setItem('grupo',JSON.stringify(response));
             var participante={
               "user":Number(this.user['id']),
               "chat":response['id'] 
             }
             this.userService.getAgregarParticipanteGrupo(participante).subscribe(
               (respo)=>{

               }
             )
             this.verificar = true;
             this.buttonVerifi = true;
             this.userService.getPhotoGrupo(formData,response['id']).subscribe(
                (res)=>{
                }
             )
           }

          )
          console.log(this.grupo)
        }
    }

    activarVentana(){
      var overlay : any;
      var popup : any;

      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');
      overlay.classList.add('active');
      popup.classList.add('active');
    }

    close(){
     var overlay : any;
      var popup : any;
      overlay = document.getElementById('overlay'),
      popup = document.getElementById('popup');
      overlay.classList.remove('active');
      popup.classList.remove('active');
    }

    selectImage(event:any) {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        // image preview
        const reader = new FileReader();
        reader.onload = e => this.foto= reader.result;this.images=file;
        reader.readAsDataURL(file);
      }else{
        this.foto = this.fotoAuxiliar;
        this.images = this.fotoAuxiliar;
      }
    }

    eliminar(id:any){
      console.log(id)
      this.userService.getEliminarParticipanteGrupo(Number(id)).subscribe(
        (response)=>{
          if(response == "ya se pudo eliminar"){
            location.reload();
          }else{
            alert("lo sentimos hubo un error")
          }
        }
      )
    }

    guardarDatos(){
      var mensaje = confirm("desas terminar el proceso de agregar usuario al chat que creaste")
      if (mensaje) {
        localStorage.removeItem('grupo');
        location.reload();
      }
    }
  
}
