import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../Cart/Cart.component';
import { RouterModule, Routes } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { CartDialogComponent } from '../CartDialog/CartDialog.component';



const routes :Routes=[
  {path:'', redirectTo:'details', pathMatch:'full'}
  ,{path:"details",component:CartComponent}
]
@NgModule({
  declarations: [
    CartComponent,
    CartDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDialogModule
  ]
})
export class CartModuleModule { }
