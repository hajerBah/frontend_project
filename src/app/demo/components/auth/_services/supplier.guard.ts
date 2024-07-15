import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class SupplierGuard implements CanActivate {
  constructor(
    public autService: AuthService,
    public router : Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
        console.log(this.autService.isSupplier());
        
      if(this.autService.isSupplier() !== true){
        this.router.navigate(["/auth/login"]);
        return false;
      }
      let token = this.autService.token;
      return true;
    }




}