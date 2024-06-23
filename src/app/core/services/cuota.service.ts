import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cuota } from '../models/cuota';

@Injectable({
  providedIn: 'root'
})
export class CuotaService {
  url = environment.urlApi + 'cuotas/';
  constructor(private httpClient: HttpClient) {}
  
  public getCuotasByCredito(idCredito:number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.url}getCuotasByCredito/${idCredito}`);
  }

  public editar(data:Cuota[]): Observable<any>{
    return this.httpClient
    .put<any>(`${this.url}editar`,data);
  }
}
