import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutServeService } from '../../Services/aut-serve.service';
import { ProductCart } from '../../ViewModel/ProductCart';

@Component({
  selector: 'app-Cart',
  templateUrl: './Cart.component.html',
  styleUrls: ['./Cart.component.scss']
})
export class CartComponent implements OnInit {
shoppingList:Observable<ProductCart[]> = this.auth.ShoppingCart.asObservable();
total:number =0
  constructor(private auth:AutServeService) 
  { 
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
productsTrackBy( index:number,item:ProductCart){
return item.quantity;
}
  ngOnInit() {
    this.updateTotalPrice()
  }
  

}
