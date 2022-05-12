import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './filters/filters.component';
import { ProductsComponent } from './products/products.component';
import { RouterModule, Routes } from '@angular/router';
import {  MatDialogModule } from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { ProductDialogComponent } from './ProductDialog/ProductDialog.component';
const routes:Routes = [
  {path:"",redirectTo:"product",pathMatch:'full'},
  {path:"product",component:ProductsComponent}

]

@NgModule({
  declarations: [
    FiltersComponent,
    ProductsComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule,
    MatCardModule
  ]
})
export class ShopModule { }
