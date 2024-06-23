import { Component, OnInit } from '@angular/core';
import { Credito } from '@core/models/credito';
import { TableColumn } from '@core/models/tableColumn';
import { CreditoService } from '@core/services/credito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creditos-pages',
  templateUrl: './creditos-pages.component.html',
  styleUrls: ['./creditos-pages.component.scss']
})
export class CreditosPagesComponent implements OnInit{

  //Datos
  dataCredito:Credito[] = [];
  //Datos Filtrados
  dataCreditoFilter:Credito[] = [];
  //Cabecera de la tabla
  tableHeaders:TableColumn[] = [
    {header: 'Cliente', field: 'persona.nombre'},
    {header: 'Proyecto', field: 'proyecto.nombre'},
    {header: 'Monto Total', field: 'montoTotal'},
    {header: 'Fecha', field: 'fechaDesembolso'}
  ];

  textFilter:string = "";
  date1:Date | undefined;
  date2:Date | undefined;

  constructor(private creditoService:CreditoService, private router:Router){}

  ngOnInit(): void {
    //Ni bien inicia el componente llamar al servcio para traer los datos
    this.getDataService();
  }

  //Obtener datos del servicio
  getDataService(){
    //Llamamos al servicio
    this.creditoService.getCreditosActivos()
    .subscribe({
      next: (data) => {
        //Obtenemos los datos
        this.dataCredito = data;
        this.dataCreditoFilter = this.dataCredito;
      }
    });
  }

  //Filtramos los datos
  filterData(){

    let date1 = this.date1 ? new Date(this.date1) : undefined;
    let date2 = this.date2 ? new Date(this.date2) : undefined;

    //Funcion filter
    this.dataCreditoFilter = this.dataCredito.filter(d => {
      const textFilterLower = this.textFilter.toLocaleLowerCase();
      const fechaDesembolso = d.fechaDesembolso ? new Date(d.fechaDesembolso) : undefined;
      
      //Si alguna fecha esta vacia solo buscar por texto
      if(date1 === undefined || date2 === undefined){
        return (
          d.persona.nombre.toLocaleLowerCase().includes(textFilterLower) ||
          d.proyecto.nombre.toLocaleLowerCase().includes(textFilterLower)
        );
      }
      //Buscar por texto y fecha
      else{
        return (
          (d.persona.nombre.toLocaleLowerCase().includes(textFilterLower) ||
          d.proyecto.nombre.toLocaleLowerCase().includes(textFilterLower)) &&
          (fechaDesembolso && date1 && date2 && fechaDesembolso >= date1 && fechaDesembolso <= date2)
        );
      }
    });
  }

  //Evento Tabla
  eventSelectTable(data:any){
    let creditoSelect:Credito = data;
    //Cambiar de ruta a cuota y mandar id de credito
    this.router.navigate(['/home/cuotas', creditoSelect.id]);
  }
}
