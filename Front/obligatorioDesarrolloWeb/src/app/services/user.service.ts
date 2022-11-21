import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private webApiUrl = 'http://localhost:8080/';
  usuariosHardcodeados: user[] = []


  constructor(private http: HttpClient) { }

  getUsers() {
    var url = this.webApiUrl + "listarUsers"
    let respuesta = this.http.get<any>(url);
    return respuesta;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  deleteUser(pUsuario: user) {
    let url = this.webApiUrl + "borrarUser";
    return this.http.post<any>(url, { mail: pUsuario.mail })
  }

  editUser(pUsuario: user, pNuevoMail: String, pNuevoRol: String) {
    let url = this.webApiUrl + "editarUser";
    return this.http.put<any>(url, { mail: pUsuario.mail, nuevoMail: pNuevoMail, rol: pNuevoRol });
  }

  createUser(mail: string, pass: string, rol: string) {
    return this.http.post<any>(
      'http://localhost:8080/crearUser', { mail, pass, rol }
    )
  }

}

