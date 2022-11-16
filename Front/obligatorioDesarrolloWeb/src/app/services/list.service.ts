import { Injectable } from '@angular/core';
import { windmillPart } from '../windmillPart';
import { PARTES } from '../partes';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getWindmillParts() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta = this.http.get<any>('http://localhost:8080/listarPiezas', { headers });
    return respuesta
  }
  addWindmillPart(nombre: string, categoria: string, altura: string, resViento: string, material: string, img: string) {
    // PARTES.push(part);

    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/crearPieza', { nombre, categoria, altura, resViento, material, img }, { headers }
    )
  }

  deleteWindmillPart(_id: string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    console.log(_id)
    return this.http.post<any>(
      'http://localhost:8080/borrarPieza', { _id:_id }, { headers }
    )
  }

  editWindmillPart(part: windmillPart) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/editarPieza', { part }, { headers }
    )
  }


}
