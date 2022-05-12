import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, filter, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthViewModel } from '../ViewModel/AuthViewModel';
import { LoginViewModel } from '../ViewModel/LoginViewModel';
import { ProductCart } from '../ViewModel/ProductCart';


@Injectable({
  providedIn: 'root'
})
export class AutServeService {
  isLoggenSubject = new BehaviorSubject<boolean>(this.hasTokken())
  currentUser = new BehaviorSubject<string>(this.currentUse())
  roles = new BehaviorSubject<string[]>(["NotFound"])
  Expire = new BehaviorSubject<string>("")
  itemsNum = new BehaviorSubject<number>(this.itemsIn())
ShoppingCart = new BehaviorSubject<ProductCart[]>(this.hasCart())

   private httpOptions;
   constructor(private httpClient: HttpClient ) {
     this.httpOptions={
       headers: new HttpHeaders({
         'Content-Type': 'application/json'
       })

   }
 }
addItem(item:ProductCart){
  let alreadyInFlag:Boolean =false
  let num = this.itemsNum.getValue()
let  pro = this.ShoppingCart.getValue()
pro.filter(x=>{
  if(x.iD == item.iD){
  x.quantity += item.quantity
  alreadyInFlag = true
}
});
if(!alreadyInFlag){
pro.push(item)
num++
}
this.ShoppingCart.next(pro)
let user = this.currentUser.getValue()
localStorage.setItem(user,JSON.stringify(pro))
this.itemsNum.next(num)
}
deleteItem(item:ProductCart){
  let pro = this.ShoppingCart.getValue()
  let res = pro.filter(x=>x.iD != item.iD)
  let user = this.currentUser.getValue()
  localStorage.setItem(user,JSON.stringify(res))
  this.ShoppingCart.next(res)
  let num =this.itemsNum.getValue()
  this.itemsNum.next(num - 1)
}
updateShopping(item:ProductCart){
  let pro = this.ShoppingCart.getValue()
  let IsAmountEmpty:boolean = false
  pro.filter(x=>{
    if(x.iD == item.iD)
    {
      x.quantity = item.quantity
      if(x.quantity == 0)
      IsAmountEmpty = true

    }
  })
  if(IsAmountEmpty){
  this.deleteItem(item)
  return
}
  localStorage.setItem(this.currentUser.getValue() , JSON.stringify(pro))

}
  // ...
  public isAuthenticated(): Observable<string>{
   return  this.Expire.asObservable();
  }
  itemsIn():number{
    let items = this.hasCart()
    if(items == [] )
    return 0
    return items.length
  }
  hasCart():ProductCart[]{
    let user = this.currentUser.getValue()
    let ret:string = String(localStorage.getItem(user))
    let res = JSON.parse(ret) as ProductCart[]
    console.log("from Has Cart")
    console.log(res)
    if(res==null)
    return []
    return res
  }
 hasTokken():boolean{
   return !!localStorage.getItem('tokken');
 }
 currentUse():string{
   let use = localStorage.getItem("user") as string
  if(use ==null)
  return ""
  return use
 }
 login(data?:LoginViewModel):Observable<AuthViewModel>
 {
   return this.httpClient.post<AuthViewModel>(`${environment.APIBaseURL}/api/Account/login`,JSON.stringify(data),this.httpOptions).pipe(
     map(n=>{
       console.log(data)
       localStorage.setItem('tokken', n.token);
       localStorage.setItem("user",n.username)
       this.isLoggenSubject.next(true);
       this.currentUser.next(n.username);
       this.roles.next(n.roles)
       return n})
 );
       // store user details and jwt token in local storage to keep user logged in between page refreshes
       // localStorage.setItem('tokken', JSON.stringify(user._id));
       // this.isLoggenSubject.next(true);
       // return user;

 // console.error('An error occurred:', err.error.message);
 }
getCurrentRolles():Observable<string[]>{
  return this.roles.asObservable();
}
 logout():void{
   localStorage.removeItem('tokken');
   this.isLoggenSubject.next(false);
   this.currentUser.next("")
   this.roles.next([])
 }
 isLoggin(): Observable<boolean>
 {
  return  this.isLoggenSubject.asObservable();
 }
 private getServerErrorMessage({ error }: { error: HttpErrorResponse; }): string {
   switch (error.status) {
     case 400:{
      return `Bad Request: ${error.message}`;
     }
       case 404: {
           return `Not Found: ${error.message}`;
       }
       case 403: {
           return `Access Denied: ${error.message}`;
       }
       case 500: {
           return `Internal Server Error: ${error.message}`;
       }
       default: {
           return `Unknown Server Error: ${error.message}${error.status}`;
       }

   }
 }
 }
