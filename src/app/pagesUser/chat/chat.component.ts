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
    foto :any;
    fotoAuxiliar:any;
    images:any;

    constructor(private formBuilder: FormBuilder,private userService : UserService) { }

    ngOnInit(): void {
      this.buildForm();
      this.grupos();
      this.verificar = false;
      this.foto = "https://i.pinimg.com/564x/0d/60/14/0d6014d3db35db2cadcf02a782330938.jpg";
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
      this.verificar = true;
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
  
}
