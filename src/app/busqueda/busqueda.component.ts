import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  form!: FormGroup;
  datos:[] = [];
  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  ngOnInit(): void {
    
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username   : ['', [Validators.required]]
    });
  }

  guardar(){
    this.userService.getBusqueda(this.form.value).subscribe(
      (response)=>{
        this.datos = JSON.parse(JSON.stringify(response || '{}'));
      }
    )
  }
}
