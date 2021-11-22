import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  form!: FormGroup;
  formMessage!: FormGroup;

  fotoEmisor='';
  idEmisor = 0;
  nameEmisor = '';
  user:any={};

  friend:any = {};
  userName = '';
  message = '';
  messageList: {message: string, userName: string,friends:string,mine: boolean,mineF:boolean}[] = [];
  userList: string[] = [];
  socket: any;
  listaAmigos : []= [];
  bandera:boolean = false;

  constructor(private formBuilder: FormBuilder,private userService : UserService) { }

  ngOnInit(): void {
    var friends = {
      'check':1
    }

    this.user =JSON.parse(this.userService.getUser() || '{}');
    this.userService.getFriendEspera(Number(this.user['id']),friends).subscribe(
      (response)=>{
       
        this.friend = response ;
        console.log(response)
        if(response != "no se encontro"){
          for (let i in this.friend){
            if (this.friend[i].photo == null){
              this.friend[i].photo = "assets/imagen/imagen2.png";
            } else{
              var photo = this.userService.getUrl()+this.friend[i].photo;
              this.friend[i].photo = photo;
            }
         }
         this.listaAmigos = this.friend;
        
        }
      },(error)=>{ console.log('error',error)}

    )
    this.fotoEmisor="assets/imagen/imagen2.png";
    this.userName= this.user['username'];
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      username   : ['', [Validators.required]]
    });

    this.formMessage = this.formBuilder.group({
       message  : ['', [Validators.required]]
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
          localStorage.setItem('cambio',"1");
          window.location.replace("/busqueda");
        }
      }
    )
  }

  userNameUpdate() {
    //this.userName = 
   
    console.log(this.userName)
    this.socket = io.io(`http://localhost:3000/?userName=${this.userName}`);

    this.socket.emit('set-user-name',this.userName);

    this.socket.on('user-list', (userList: string[]) => {
      console.log(userList);
      this.bandera = true;
      this.userList = userList;
    });

    this.socket.on('message-broadcast', (data: {message: string, userName: string,friends:string}) => {
      if (data) {
        this.messageList.push({message: data.message, userName: data.userName,friends:this.nameEmisor,mine: false,mineF:true});
      }
    });

  }

  seleccion(id:any){
    if(this.bandera == false){
      this.userNameUpdate();
    }else{
      this.socket.disconnect();
      this.bandera = false;
      this.messageList = []
      this.userNameUpdate();
    }
    for (let i in this.friend){
      if (this.friend[i].id == id){
        this.idEmisor = this.friend[i].id
        this.nameEmisor = this.friend[i].first_name; 
        this.fotoEmisor = this.friend[i].photo ;
      }
   }
  
  }

  sendMessage(): void {
  
    this.message = this.formMessage.value.message;
    this.socket.emit('message', this.message);
    this.messageList.push({message: this.message, userName: this.userName,friends:this.nameEmisor,mine: true,mineF:false});
    console.log(this.messageList)
    this.message = '';
  }
}
