import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Credito } from '@core/models/credito';
import { Cuota } from '@core/models/cuota';
import { TableColumn } from '@core/models/tableColumn';
import { CreditoService } from '@core/services/credito.service';
import { CuotaService } from '@core/services/cuota.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cuotas-pages',
  templateUrl: './cuotas-pages.component.html',
  styleUrls: ['./cuotas-pages.component.scss']
})
export class CuotasPagesComponent implements OnInit{

  //Datos
  dataCuota:Cuota[] = [];
  creditoNow: Credito = new Credito();
  //Cabecera de la tabla
  tableHeaders:TableColumn[] = [
    {header: 'Monto Total', field: 'monto'},
    {header: 'Monto Partcial', field: 'montoPagado'},
    {header: 'Fecha Pago', field: 'fechaPago'}
  ];

  idCredito:number = 0;
  visibleAlert:boolean = false;

  constructor(private activatedRoute:ActivatedRoute, private creditoService:CreditoService, private cuotaService:CuotaService,
    private router:Router, private messageService: MessageService
  ){

  }

  ngOnInit(): void {
    this.idCredito = this.activatedRoute.snapshot.params['idCredito'];

    this.getDataServiceCredito();
  }

  //Obtener datos del servicio
  getDataServiceCredito(){
    //Verificamos si el id es valido
    if(this.idCredito === undefined || this.idCredito <= 0){
      this.router.navigate(['/home/creditos']);
      return;
    }
    //Llamamos al servicio de credito para valida si existe el idcredito
    this.creditoService.getCreditosById(this.idCredito)
    .subscribe({
      next: (data) => {
        console.log(data);
        //Obtenemos los datos
        if(data === null){
          this.router.navigate(['/home/creditos']);
        }
        else{
          this.creditoNow = data;
          this.getDataService();
        }
      },
      error: (err) => {
        this.router.navigate(['/home/creditos']);
      }
    });
  }

  //Obtener datos del servicio
  getDataService(){
    //Llamamos al servicio
    this.cuotaService.getCuotasByCredito(this.idCredito)
    .subscribe({
      next: (data) => {
        //Obtenemos los datos
        this.dataCuota = data;
        console.log(this.dataCuota);
      }
    });
  }
  //Abrir alerta para confirmar guardado
  openAlertConfirm(){
    this.visibleAlert = true;
  }
  //Evento de alerta
  eventConfirmAlert(alertActive:number){
    this.visibleAlert = false;
    if(alertActive === 1){
      this.saveData();
    }
  }
  //Guardar los datos
  saveData(){
    this.cuotaService.editar(this.dataCuota).
    subscribe({
      next: (data) => {
        //Obtenemos los datos
        console.log(data);
        this.dataCuota = data;
        this.showBottomCenter();
      }
    });
  
  }

  showBottomCenter() {
    this.messageService.add({ key: 'bc', severity: 'success', summary: 'Success', detail: 'Guardado exitosamente' });
  }
}
