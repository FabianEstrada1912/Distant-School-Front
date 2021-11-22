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
  foto :any;
  fotoAuxiliar:any;
  images:any;

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
    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.descripcion =JSON.parse(this.userService.getDescripcion() || '{}');
    this.userService.getProfile(Number(this.user['id'])).subscribe(
      (response)=>{
        if(response['photo'] == null){
          this.foto = "assets/imagen/imagen2.png";
        }else{
          this.foto =this.userService.getUrl()+response['photo'];
        }
      },(error)=>{ console.log('error',error)}
    );

    this.id= this.user['id'];
    this.fotoAuxiliar = this.foto;
    this.buildForm();
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

  selectImage(event:any) {

    
    if (event.target.files && event.target.files[0]) {

      var mensaje = confirm("deseas cambiar la foto del perfil?");

      if (mensaje) {
        const file = event.target.files[0];
        // image preview
        const reader = new FileReader();
        reader.onload = e => {
          this.foto= reader.result;
          this.images=file;
      
          const formData = new FormData();
          formData.append('file',this.images);
          this.userService.getPhoto(formData,Number(this.user['id'])).subscribe(
          (response)=>{
             
          }) 
        }
        reader.readAsDataURL(file);
      }else {
        this.foto = this.fotoAuxiliar;
        this.images = this.fotoAuxiliar;
       }
    }else{
      this.foto = this.fotoAuxiliar;
      this.images = this.fotoAuxiliar;
    }
  }


}
