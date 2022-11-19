import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { windmill } from '../windmill';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { windmillPart } from '../windmillPart';

@Injectable({
  providedIn: 'root'
})
export class WindmillService {

  private webApiUrl = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }

  getWindmills() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta = this.http.get<any>("http://localhost:8080/listarMolinos",{headers});
    return respuesta
  }

  getWindmillPart(idPart:string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta =  this.http.get<any>("http://localhost:8080/getPart?idPart="+idPart,{headers})
    return respuesta
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  auditar(pId: String, audito:boolean):void{
    console.log("llegue al servicio "+audito)
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let url = this.webApiUrl + "cambiarEstado";
    this.http.post<any>(url,{_id:pId, flag:audito}, {headers});

  }

  addWindmill(aspa: any, base: any, cuerpo: any) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    const url = this.webApiUrl + "crearMolino"
    return this.http.post<any>(url, { _idBase: base._id, _idCuerpo: cuerpo._id, _idAspa: aspa._id }, { headers })
  }

  
}

