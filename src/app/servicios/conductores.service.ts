import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConductoresService {
  private apiUrl = 'http://localhost:8080/conductor/';

  constructor(private http: HttpClient, private httpClient: HttpClient) {}

  getConductor(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public saveConductor(conductor: any): Observable<any> {
    return this.httpClient.post(this.apiUrl, conductor);
  }
}
