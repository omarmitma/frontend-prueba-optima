import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page.component';

const routes: Routes = [ 
    { path:'',component: HomePageComponent, children:[
      { path:'creditos', loadChildren: () => import('@modules/creditos/creditos.module').then(m => m.CreditosModule) },
      { path:'cuotas/:idCredito', loadChildren: () => import('@modules/cuotas/cuotas.module').then(m => m.CuotasModule) },
      { path:'**', redirectTo : 'creditos' }
    ]},
    { path:'**', redirectTo : '' }
  ];

@NgModule({
  imports: [
    RouterModule.forChild( routes )
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
