import { HttpEvent,HttpHandler,HttpInterceptor,HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize, Observable } from "rxjs";
import { LoaderService } from "./Loader.service";
@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private loader:LoaderService){}
  intercept(req: HttpRequest<unknown>, next: HttpHandler ):Observable<HttpEvent<unknown>>{
    this.loader.show();
    const Token = localStorage.getItem('tokken')
    if(Token){
      console.log("Token Here")
        console.log(Token)
        req = req.clone({
          setHeaders: {
            'Authorization': `bearer ${Token}`
          }
        });
    }
      return next.handle(req).pipe(finalize(() => {
        this.loader.hide();
      })
    );


  }
}
