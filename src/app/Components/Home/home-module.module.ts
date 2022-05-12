import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { KidsComponent } from './kids/kids.component';
import { MenComponent } from './men/men.component';
import { WomenComponent } from './women/women.component';
import { ProductDialogComponent } from './ProductDialog/ProductDialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

const routes:Routes = [
  {path:'kids' , component:KidsComponent},
]
@NgModule({
  declarations: [
    KidsComponent,
    MenComponent,
    WomenComponent,
    ProductDialogComponent,
   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    RouterModule.forChild(routes )
  ]
})
export class HomeModuleModule { }
