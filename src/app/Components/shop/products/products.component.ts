import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductModel } from '../../Models/ProductModel';
import { AutServeService } from '../../Services/aut-serve.service';
import { LoaderService } from '../../Services/Loader.service';
import { ProductService } from '../../Services/Product.service';
import { CategoryProductViewModel } from '../../ViewModel/categoryProductViewModel';
import { ProductCart } from '../../ViewModel/ProductCart';
import { ProductFiltered } from '../../ViewModel/ProductFiltered';
import { ProductDialogComponent } from '../ProductDialog/ProductDialog.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  rateNum:number=0
  active:number 
  filter:ProductFiltered
  produtList!:ProductModel[] 
  categories!:CategoryProductViewModel[]
  constructor(private prodServ:ProductService,public Dialog:MatDialog 
    ,public load:LoaderService,private authServ:AutServeService) { 
      this.active =1
      this.filter = {filter:"",id:1,page:0,size:8,order:"asc"};
      this.updateProduct(8)
      this.loadCat()
    }
    loadCat(){

      this.prodServ.getCategoryProduct().subscribe(x=>{this.categories = x ;
        console.log("categories")
        console.log(x)})
    }
    openDialog(item:ProductModel){
      let dialogRef = this.Dialog.open(ProductDialogComponent ,{data:item})
    
    }
  ngOnInit(): void {
    console.log(this.produtList)
    this.updateProduct(8)
    this.loadCat()
  }
  updateProduct(num:number){
    this.filter.size = num
    this.prodServ.getFilteredProduct(this.filter).subscribe(
      x=>{
      this.produtList = []
      this.produtList = x
     console.log(x)
    }
    )
  }
  changeFilter(num:number){
    this.updateProduct(num)
  }
  rate(Product:ProductModel,num:number){
    console.log(num)
    Product.rate=num
    this.produtList.filter(x=>
      {
        if(x.id == Product.id)
        x.rate=num
      }
      )
  }
  addTocart(item:ProductModel){
    console.log(item)
    let pro:ProductCart = {
      iD :item.id,
      img:item.imagePath,
      name:item.name,
      price:item.price,
      quantity:1
    }
    this.authServ.addItem(pro)
    console.log(this.authServ.hasCart())
  }
  productsTrackBy(index:number, item:ProductModel)
  {
    return item.rate;
  }
  catFilter(catId:number){
    this.prodServ.getProductsByCatID(catId).subscribe( x=>
      this.produtList = x
    )
  }
}
