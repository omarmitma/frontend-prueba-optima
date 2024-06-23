import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Voucher } from '@core/models/voucher';
import { SortEvent } from 'primeng/api';
import { FileUploadEvent } from 'primeng/fileupload';
import { TableColumn } from 'src/app/core/models/tableColumn';

@Component({
  selector: 'app-table-main',
  templateUrl: './table-main.component.html',
  styleUrls: ['./table-main.component.scss']
})
export class TableMainComponent implements OnInit{
  
  @Input() dataMain:any[] = [];
  @Input() tableHeaders:TableColumn[] = [];

  @Input() viewSelect:boolean = false;
  @Input() viewVouchers:boolean = false;

  //Eventos
  @Output() eventSelectTable = new EventEmitter<any>();

  constructor(private fireStorage:AngularFireStorage) {}

  ngOnInit() {
    
  }
  //Ordenar
  customSort(event: SortEvent) {
    if (!event.data || !event.field || !event.order) {
        return;
    }
    //Los que son campos anidados los sepparamos
    const fieldParts = event.field.split('.');
    //Ordenamos la data
    event.data.sort((data1, data2) => {
        let value1 = data1;
        let value2 = data2;

        for (const part of fieldParts) {
            if (value1 !== null && value1 !== undefined) {
                value1 = value1[part];
            }
            if (value2 !== null && value2 !== undefined) {
                value2 = value2[part];
            }
        }

        let result = null;

        if (value1 == null && value2 != null) result = -1;
        else if (value1 != null && value2 == null) result = 1;
        else if (value1 == null && value2 == null) result = 0;
        else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
        else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

        return (event.order || 1) * result;
    });
  }
  //Eventos de botones
  selectItem(data:any){
    this.eventSelectTable.emit(data);
  }

  //Subir imagen a fire base
  async onUpload(event: FileUploadEvent, voucher:any) {
    const file = event.files[0];
    if(file){
      const path = `file/${file.name}`;
      
      const uploadedFileRef = this.fireStorage.ref(path); // Obtener una referencia al archivo en Firebase Storage
      const uploadedFileSnapshot = await uploadedFileRef.put(file); // Subir el archivo y obtener el snapshot
      
      // Obtener el nombre y la URL del archivo subido
      const fileName = uploadedFileSnapshot.metadata.name;
      const fileURL = await uploadedFileSnapshot.ref.getDownloadURL();

      voucher.archivo = fileName;
      voucher.ruta = fileURL;

    }
  }

  //
  deleteArchivo(voucher:any){
    voucher.archivo = "";
    voucher.ruta = "";
  }

  //Calcular monto parcial
  calcMontoParcial(){
   
    this.dataMain.forEach(d => {
      d.montoPagado = 0;
      d.vouchers.forEach((v:any) => {
        d.montoPagado += v.monto;
      });
    });
  }
  //Agregar voucher
  addVoucher(cuota:any){
    cuota.vouchers.push(new Voucher());
  }
  //Eliminar 
  deleteVoucher(cuota:any, voucher:any){
    cuota.vouchers = cuota.vouchers.filter((v:any) => v !== voucher);
  }
}
