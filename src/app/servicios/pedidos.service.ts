import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private apiUrl = 'http://localhost:8080/pedido/';

  constructor(private http: HttpClient, private httpClient: HttpClient) {}

  getVehiculoByConductorId(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}`);
  }

  public savePedidos(pedido: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, pedido);
  }

  desasociarPedido(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}desasociar/${id}`);
  }
}
