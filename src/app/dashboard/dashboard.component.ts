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
  chat:any = {};
  userName = '';
  message = '';
  messageList: {message: string, userName: string,friends:string,mine: boolean,mineF:boolean}[] = [];
  listaEmisor:any[]=[]
  listaReceptor:any[]=[]
  userList: string[] = [];
  socket: any;
  listaAmigos : []= [];
  listaChat : []= [];
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

         if(this.userService.getMensaje() != null){
          var mensajes:any={};
          mensajes =JSON.parse(this.userService.getMensaje() || '{}');
          for (let i in this.friend){
            if (this.friend[i].id == Number(mensajes['idFriend']) ){
              this.idEmisor = this.friend[i].id
              this.nameEmisor = this.friend[i].first_name; 
              this.fotoEmisor = this.friend[i].photo ;
            }
           } 
          
        }else{
          console.log("..........")
          this.fotoEmisor="assets/imagen/imagen2.png";
        }
        
        }
      },(error)=>{ console.log('error',error)}

    )
       
    this.userService.getVisualizsarGrupo({"user":Number(this.user['id'])} ).subscribe(
      (response)=>{
        this.chat = response;
        if(response != "no se encontro"){
          
          for (let i in this.chat){
            if (this.chat[i].photo == null){
              this.chat[i].photo = "assets/imagen/imagen2.png";
            } else{
              var photo = this.userService.getUrl()+this.chat[i].photo;
              this.chat[i].photo = photo;
            } 
         }
         this.listaChat = this.chat;
        }

      }
    )

    this.userName= this.user['username'];
    this.buildForm();
    this.userNameUpdate();

   
    
    this.socket.on("new_message",(data:any) =>{
      this.messageList.push({message:data.message, userName:data.sender,friends:data.recever,mine: false,mineF:true});
      this.message = '';
   })

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
          this.socket.disconnect();
          window.location.replace("/busqueda");
        }
      }
    )
  }

  userNameUpdate() {
    //this.userName = 
    this.socket = io.io("http://localhost:3000/");
    this.socket.emit("user_connect",this.userName);

  }

  seleccion(id:any){
  
    for (let i in this.friend){
      if (this.friend[i].id == id){
        this.idEmisor = this.friend[i].id
        this.nameEmisor = this.friend[i].username; 
        this.fotoEmisor = this.friend[i].photo ;
      }
   } 

   this.userService.getMostrarMensaje(Number(this.user['id']),this.idEmisor).subscribe(
     (response)=>{
      
       if(response.length == 0){

       }else{
        if(response.length == 1){
          console.log(response)
          this.listaReceptor = response 
          
         }else{
          this.listaEmisor = JSON.parse(JSON.stringify(response['remite']))
          this.listaReceptor = JSON.parse(JSON.stringify(response['receptor']))
         }
       }
      
     }
   )

   this.messageList = []
   this.listaEmisor = []
   this.listaReceptor = []
  }

  sendMessage(): void {
  
    this.message = this.formMessage.value.message;
    //this.socket.emit('message', this.message);
    this.socket.emit("send_message",{
      sender :this.userName,
      receiver: this.nameEmisor,
      message: this.message,
    })
    this.messageList.push({message:this.message, userName:this.userName,friends:this.userName,mine: true,mineF:false});
  }


  cambio(){
    this.socket.disconnect();
    window.location.replace("/configuracion");
  }

  seleccion2(id:any){
  
    for (let i in this.chat){
     
      if (this.chat[i].id == id){
        this.idEmisor = this.chat[i].id
        this.nameEmisor = this.chat[i].name; 
        this.fotoEmisor = this.chat[i].photo ;
      }
   } 
   this.socket = io.io("http://localhost:3000/");
    this.socket.emit("user_connect",this.nameEmisor);

   this.messageList = []
  }

}

