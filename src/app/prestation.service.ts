import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class Prestation {
  constructor(
    public id: number,
    public libelle: string,
    public description: string
  ) {
  }
}

@Injectable({
  providedIn: 'root'
})
export class PrestationService {
  
  apiUrl = 'http://localhost:8081/gestion-0.0.1-SNAPSHOT/prestations';

  constructor(public httpClient:HttpClient) { }
  
  getPosts(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}`);
  }

}

