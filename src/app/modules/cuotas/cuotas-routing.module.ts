import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuotasPagesComponent } from './pages/cuotas-pages.component';

const routes: Routes = [ 
    { path:'',component: CuotasPagesComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class CuotasRoutingModule { }
