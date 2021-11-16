import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:8000/";
  
  token = localStorage.getItem("Token") ;
  user = localStorage.getItem("user");
  descripcion =  localStorage.getItem("descripcion");
  busqueda=  localStorage.getItem("busqueda");
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json','Authorization':'Token '+this.token});
  
  constructor(protected http : HttpClient) { }

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

  getUser(){
    return this.user;
  }

  getBusquedaProfile(){
    return this.busqueda;
  }

  getDescripcion(){
    return this.descripcion;
  }
}
