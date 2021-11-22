import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = "http://localhost:8000/";
  urls = "http://localhost:3000/";
  
  private socket: Socket;
  token = localStorage.getItem("Token") ;
  user = localStorage.getItem("user");
  descripcion =  localStorage.getItem("descripcion");
  busqueda=  localStorage.getItem("busqueda");
  cambioBusqueda = localStorage.getItem("cambio");
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Token '+this.token});
  
  constructor(protected http : HttpClient) { 
    this.socket = io(this.urls, {transports: ['websocket', 'polling', 'flashsocket']});
  }

  getLogin(user:any):Observable<any>{
    return this.http.post(this.url+"Login/",user);
  }

  getProfile(id:Number):Observable<any>{
    return this.http.get(this.url+"Profile/Profile/"+0+"/"+id+"/",{headers:this.httpHeaders})
  }

  getProfileEdit(user:any,id:Number,idDescripcion:Number):Observable<any>{
    return this.http.put(this.url+"Profile/Profile/"+idDescripcion+"/"+id+"/",user,{headers:this.httpHeaders})
  }

  getBusqueda(username:any):Observable<any>{
    return this.http.post(this.url+'Search/Search/',username,{headers:this.httpHeaders})
  }

  getFriendEspera(id:Number,friend:any){
    return this.http.post(this.url+"Friend/Friend/"+id+"/",friend,{headers:this.httpHeaders})
  }

  getFriendEsperaEditar(id:Number,friend:any){
    return this.http.put(this.url+"Friend/Friend/"+id+"/",friend,{headers:this.httpHeaders})
  }

  getFriendDeleteEditar(id:Number){
    return this.http.delete(this.url+"Friend/Friend/"+id+"/",{headers:this.httpHeaders})
  }

  getPhoto(photo:FormData,id:Number){
    return this.http.put(this.urls+'api/foto/'+id+"/",photo);
  }

  joinRoom(data:any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data:any): void {
    this.socket.emit('message', data);
  }

  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    var storage: any;
    storage = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data:any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

  getUser(){
    return this.user;
  }

  getBusquedaProfile(){
    return this.busqueda;
  }

  getDescripcion(){
    return this.descripcion;
  }

  getCambio(){
    return this.cambioBusqueda;
  }

  getUsers(){
    return !! this.user;
  }

  getUrl(){
    return this.urls;
  }
}

