import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutServeService } from '../Services/aut-serve.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn:Observable<boolean>
  itemNum:Observable<number>
  constructor( private auth:AutServeService , private router:Router) {
    this.isLoggedIn = auth.isLoggin()
    this.itemNum = this.auth.itemsNum.asObservable()
  }

  ngOnInit(): void {
  }
  logout(){
  this.auth.logout()
  this.router.navigate(['admin/login']);
  }
}
