import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindmillPartService {

  private webApiUrl = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWindmillParts() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta = this.http.get<any>('http://localhost:8080/listarPiezas', { headers });
    return respuesta
  }
}
