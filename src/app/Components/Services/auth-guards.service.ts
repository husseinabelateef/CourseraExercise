import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AutServeService } from './aut-serve.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate {
  constructor(private router:Router , private auth:AutServeService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

   if(!this.auth.hasTokken())
   {
      this.router.navigate(['HexAcount/login']);
       return false;
   }
   else{
    let inRolle:Boolean = false
     this.auth.getCurrentRolles().subscribe(x=>
x.map(i=>
  (i=="User")?inRolle = true:inRolle))

      if(inRolle){

          return true
      }
      this.router.navigate(['HexAcount/login']);
      alert("You Are Not Admin ..Please Login As Admin");
       return false;
   }
  }

}
