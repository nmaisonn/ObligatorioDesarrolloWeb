import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WindmillService {

  private webApiUrl = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getWindmills() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta = this.http.get<any>("http://localhost:8080/listarMolinos",{headers});
    return respuesta
  }
}
