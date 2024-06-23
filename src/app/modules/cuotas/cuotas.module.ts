import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuotasPagesComponent } from './pages/cuotas-pages.component';
import { CuotasRoutingModule } from './cuotas-routing.module';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';


@NgModule({
  declarations: [
    CuotasPagesComponent
  ],
  imports: [
    CommonModule,
    CuotasRoutingModule,
    SharedModule,
    FormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule
  ]
})
export class CuotasModule { }
