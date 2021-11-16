import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  user:any={};
  descripcion :any={};
  id:string="";

  private buildForm() {
    this.form = this.formBuilder.group({
      username   : [this.user['username'], [Validators.required]],
      email: [this.user['email'], [Validators.required]],
      first_name: [this.user['first_name'], [Validators.required]],
      last_name: [this.user['last_name'], [Validators.required]],
      description: [this.descripcion['descripcion'], [Validators.required]],
      user: [Number(this.descripcion['idUser']), [Validators.required]],
    });
  }
  
  ngOnInit(){
    this.descripcion = JSON.parse(this.userService.getDescripcion() || '{}');
    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.id= this.user['id'];
    this.buildForm();
    console.log(this.form.value)
  }

  guardar(){
    this.userService.getProfileEdit(this.form.value,Number(this.user['id']),Number(this.descripcion['idUser'])).subscribe(
      (response)=>{
        if (response == "No se pudo editar :("){
          alert("no se pudo editar el usuario")
        }else{
          var user ={
            'username':response['user']['username'],
            'id':this.id,
            'first_name':response['user']['first_name'],
            'last_name':response['user']['last_name'],
            'email':response['user']['email'],
          }
           this.userService.getProfile(Number(user['id'])).subscribe(
              (res)=>{
                localStorage.setItem('descripcion',JSON.stringify(res));
              },(error)=>{ console.log('error',error)}
            );
          localStorage.setItem('user',JSON.stringify(user));
          alert("ya se modifico")
          location.reload();
        }
      },(error)=>{ console.log('error',error)}
    )
  }

}
