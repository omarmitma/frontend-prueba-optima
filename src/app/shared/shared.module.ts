import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AlertConfirmComponent } from './component/alert/alert-confirm/alert-confirm.component';
import { TableMainComponent } from './component/table-main/table-main.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavComponent } from './component/nav/nav.component';

import { NestedPropertyPipe } from './pipes/nested-property.pipe';
//PrimeNg
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    TableMainComponent,
    NestedPropertyPipe,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AlertConfirmComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TableModule,
    ButtonModule,
    ToastModule,
    FileUploadModule,
    CalendarModule,
    FormsModule,
    InputNumberModule
  ],
  providers: [
    MessageService
  ],
  exports: [
    TableMainComponent,
    NestedPropertyPipe,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    AlertConfirmComponent,
    //Pipe
    NestedPropertyPipe
  ]
})
export class SharedModule { }
