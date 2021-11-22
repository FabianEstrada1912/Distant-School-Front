import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  form!: FormGroup;
  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  ngOnInit(): void {
    this.buildForm();
    if(this.userService.user){
      window.location.replace("/Dashboard");
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username   : ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  guardar(){
    this.userService.getLogin(this.form.value).subscribe(
      (response)=>{
        if(response == "usuario no valido"){
          alert("Usuario no valido")
        }else{
          var user ={
            'username':response['username'],
            'id':response['user_id'],
            'first_name':response['first_name'],
            'last_name':response['last_name'],
            'email':response['email'],
          }
          localStorage.setItem('user',JSON.stringify(user));
          localStorage.setItem('Token', response['token']);
          alert("Bienvenido a distant School");
          window.location.replace("/Dashboard");
        }
      },(error)=>{ console.log('error',error)}
    )
  }

}
