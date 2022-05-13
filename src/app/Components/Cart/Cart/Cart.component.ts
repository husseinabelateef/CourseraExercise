import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ProductModel } from '../../Models/ProductModel';
import { AutServeService } from '../../Services/aut-serve.service';
import { ProductService } from '../../Services/Product.service';
import { ProductCart } from '../../ViewModel/ProductCart';
import { ResponseOrder } from '../../ViewModel/ResponseOrder';
import{CartDialogComponent} from '../CartDialog/CartDialog.component'

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.scss']
})
export class CartComponent implements OnInit {
shoppingList:Observable<ProductCart[]> = this.auth.ShoppingCart.asObservable();
total:number =0
respons:ResponseOrder = {isOk:true,productsFailed:[]}
productList:ProductModel[]
  constructor(public Dialog:MatDialog ,private auth:AutServeService,private prodServ:ProductService)
  {
    this.productList=[]
    this.prodServ.getAllProducts().subscribe(x=>this.productList = x)
    this.updateTotalPrice()
  }
updateTotalPrice(){

this.shoppingList.subscribe(x=>{
  this.total = 0
  x.filter(i=>{
    this.total += i.price * i.quantity
  })
})
  }
deleteItem(item:ProductCart)
{
this.auth.deleteItem(item);
this.updateTotalPrice()
}
decreaseQuantity(item:ProductCart){
  if(item.quantity != 1)
  item.quantity = item.quantity - 1
  this.auth.updateShopping(item)
  this.updateTotalPrice()
}
increaseQuantity(item:ProductCart){
  item.quantity = item.quantity + 1
  this.auth.updateShopping(item)
  this.updateTotalPrice()
}
checkAvailability(){

  let cart = this.auth.ShoppingCart.getValue();
  this.productList.forEach(x=>{
    cart.forEach(
      i=>{
        if(x.id == i.iD)
        {
          if(x.quantity < i.quantity)
          this.respons.isOk = false
        }
      }
    )
  })
}
productsTrackBy( index:number,item:ProductCart){
return item.quantity;
}
checkout(){
  let list = this.auth.ShoppingCart.getValue();
  this.prodServ.postOrderList(list,this.auth.currentUser.getValue()).subscribe(x=>{
this.respons = x
  });
  list.forEach(x=>{
    this.auth.deleteItem(x)
  })
  this.auth.ShoppingCart.next([]);

}
  ngOnInit() {
    this.updateTotalPrice()
    this.prodServ.getAllProducts().subscribe(x=>this.productList = x)
  }
openDialog(){
  this.checkAvailability()
   let dialogRef = this.Dialog.open(CartDialogComponent ,{data:this.respons})

   dialogRef.afterClosed().subscribe(res=>{
     if(res){
      this.checkout()
     }
   })
  }



}


