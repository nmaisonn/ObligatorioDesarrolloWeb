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
    return this.http.get<any>(
      'http://localhost:8080/listarPiezas', { headers });
  }
  addWindmillPart(name: string, category: number, height: number, wind: number, material: string, img: string) {
    // PARTES.push(part);

    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/crearPieza', { name, category, height, wind, material, img }, { headers }
    )
  }

  deleteWindmillPart(part: windmillPart) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/borrarPieza', { part }, { headers }
    )

  }

  editWindmillPart(part: windmillPart) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/editarPieza', { part }, { headers }
    )
  }


}
