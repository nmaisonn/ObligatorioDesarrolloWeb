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
    let respuesta = this.http.get<any>("http://localhost:8080/listarMolinos");
    return respuesta
  }

  getWindmillPart(idPart: string) {
    let respuesta = this.http.get<any>("http://localhost:8080/getPart?idPart=" + idPart)
    return respuesta
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  auditar(pId: String, audito: boolean) {
    let url = this.webApiUrl + "cambiarEstado";
    return this.http.post<any>(url, { _id: pId, flag: audito });

  }

  addWindmill(aspa: any, base: any, cuerpo: any, nombre: string, descripcion: string) {
    const url = this.webApiUrl + "crearMolino"
    return this.http.post<any>(url, { _idBase: base._id, _idCuerpo: cuerpo._id, _idAspa: aspa._id, nombre, descripcion })
  }


}

