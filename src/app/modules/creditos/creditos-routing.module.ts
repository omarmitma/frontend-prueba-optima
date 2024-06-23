import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditosPagesComponent } from './pages/creditos-pages.component';

const routes: Routes = [ 
    { path:'',component: CreditosPagesComponent},
    { path:'**', redirectTo : '' }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CreditosRoutingModule { }
