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
    let respuesta = this.http.get<any>('http://localhost:8080/listarPiezas');
    return respuesta
  }
  addWindmillPart(nombre: string, categoria: string, altura: string, resViento: string, material: string,img:string) {
    return this.http.post<any>(
      'http://localhost:8080/crearPieza', { nombre, categoria, altura, resViento, material,img }
    )
  }

  deleteWindmillPart(_id: string) {
    return this.http.post<any>(
      'http://localhost:8080/borrarPieza', { _id:_id }
    )
  }

  editWindmillPart(part: windmillPart) {
    return this.http.post<any>(
      'http://localhost:8080/editarPieza', { part }
    )
  }


}
