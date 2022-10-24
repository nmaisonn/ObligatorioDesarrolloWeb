import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { windmill } from '../windmill';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WindmillService {

  private webApiUrl = 'http://localhost:8090/aprovve';


  constructor(private http: HttpClient) { }

  getWindmills(): Observable<windmill[]> {
    return this.http.get<windmill[]>(this.webApiUrl);
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /*
  Ir a la API con el texto que se pasa, buscar en los estados de los molinos,
  Si el estado coincide con el texto de parametro retorno un array de todos los molinos cuyo estado=pTexto
  Sino retorno un array vacio.
  */
  findWindmills(pTexto:String):Observable<windmill[]>{
    const url = `${this.webApiUrl}/${pTexto}`;
    return this.http.get<windmill[]>(url,this.httpOptions);
  }
  
}

