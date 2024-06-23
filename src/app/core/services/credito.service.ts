import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credito } from '@core/models/credito';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {
  url = environment.urlApi + 'creditos/';
  constructor(private httpClient: HttpClient) {}
  
  public getCreditosByPersona(idPersona:number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.url}getCreditosByPersona/${idPersona}`);
  }
  public getCreditosActivos(): Observable<any>{
    return this.httpClient
    .get<any>(`${this.url}getCreditosActivos`);
  }
  public getCreditosById(id:number): Observable<any>{
    return this.httpClient
    .get<any>(`${this.url}getCreditosById/${id}`);
  }
  public editar(data:Credito): Observable<any>{
    return this.httpClient
    .put<any>(`${this.url}editar`,data);
  }
}
