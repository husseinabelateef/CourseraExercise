import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModuleModule } from './Components/Home/home-module.module';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AuthGuardsService } from './Components/Services/auth-guards.service';

const routes: Routes = [
  {
    path: 'HexaAcount',
    loadChildren: () => import('./Components/auhtherization/auhtherization.module').then(m => m.AuhtherizationModule)
  },
  {path:'hexaShop',component:MainLayoutComponent ,children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {
      path: 'home',
      loadChildren: () => import('./Components/Home/home-module.module').then(m => HomeModuleModule)
    },
    {
      path: 'cart',//canActivate:[AuthGuardsService],
      loadChildren: () => import('./Components/Cart/cart-module/cart-module.module').then(m => m.CartModuleModule)
    },

     {
       path: 'shop',//canActivate:[AuthGuardsService],
       loadChildren: () => import('./Components/shop/shop.module').then(m => m.ShopModule)
     }
  ]},
  {path:'**', component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
