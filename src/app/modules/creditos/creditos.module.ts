import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditosPagesComponent } from './pages/creditos-pages.component';
import { SharedModule } from '@shared/shared.module';
import { CreditosRoutingModule } from './creditos-routing.module';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    CreditosPagesComponent
  ],
  imports: [
    CommonModule,
    CreditosRoutingModule,
    SharedModule,
    FormsModule,
    InputTextModule,
    CalendarModule,
    ButtonModule,
  ]
})
export class CreditosModule { }
