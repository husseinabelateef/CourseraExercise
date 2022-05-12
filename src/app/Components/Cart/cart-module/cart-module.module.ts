import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../Cart/Cart.component';
import { RouterModule, Routes } from '@angular/router';


const routes :Routes=[
  {path:'', redirectTo:'details', pathMatch:'full'}
  ,{path:"details",component:CartComponent}
]
@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CartModuleModule { }
