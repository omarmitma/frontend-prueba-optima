import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nestedProperty',
  pure: false
})
export class NestedPropertyPipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, path: string): any {
    if (!value || !path) {
      return null;
    }

    const result = path.split('.').reduce((acc, part) => acc && acc[part], value);

    // Verificamos si el valor es una fecha
    if (this.isDate(result)) {
      return this.datePipe.transform(result, 'dd/MM/yyyy'); // Convertimos las fechas en el formato 
    }

    return result;
  }

  //Validar si es una fecha
  isDate(value: any): boolean {
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime()) ||
           (typeof value === 'string' && !isNaN(Date.parse(value)));
  }
}
