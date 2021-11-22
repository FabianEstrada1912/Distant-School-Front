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
      this.userService.getBusqueda(user).subscribe(
        (response)=>{
          this.datos = JSON.parse(JSON.stringify(response || '{}'));
        }
      )
    }

    if(this.userService.getCambio() == "2"){
       this.verificar = false;
    }else if (this.userService.getCambio() == "1"){
       this.verificarAgregado = false;
    }
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

  l5s(){
    alert("sddd")
  }
  
}
