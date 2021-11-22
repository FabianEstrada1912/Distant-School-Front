import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  
  constructor(private router: Router, private userService :UserService) {}

  canActivate(){
    if(this.userService.getUsers()){
      return true;
   }
   this.router.navigate(['/'])
   return false;
  }
  
  
}
