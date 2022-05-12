import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegesterComponent } from './regester/regester.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes = [
  {path:'login' , component:LoginComponent},
  {path:'regester' , component:RegesterComponent}

]
@NgModule({
  declarations: [
    LoginComponent,
    RegesterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes )
  ]
})
export class AuhtherizationModule { }
