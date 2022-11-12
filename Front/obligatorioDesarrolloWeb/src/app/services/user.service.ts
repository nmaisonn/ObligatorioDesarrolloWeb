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

  getUserHardCode(): user[] {
    this.cargarUsuariosHardCodeados();
    return this.usuariosHardcodeados;
  }

  getUsers(): Observable<user[]> {
    var url= this.webApiUrl+"listarUsers"
    return this.http.get<user[]>(this.webApiUrl);
  }
 
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  cargarUsuariosHardCodeados(): void {
   
    let xUsuario1: user = {
      id: "1",
      mail:"usuario1@gmail.com",
      pass:"pass1",
      rol:"Administrador"
    };
    let xUsuario2: user = {
      id: "2",
      mail:"usuario2@gmail.com",
      pass:"pass2",
      rol:"Operario"
    };
    let xUsuario3: user = {
      id: "3",
      mail:"usuario3@gmail.com",
      pass:"pass3",
      rol:"Auditor"
    };
    let xUsuario4: user = {
      id: "4",
      mail:"usuario4@gmail.com",
      pass:"pass4",
      rol:"Operario"
    };
    

    this.usuariosHardcodeados.push(xUsuario1);
    this.usuariosHardcodeados.push(xUsuario2);
    this.usuariosHardcodeados.push(xUsuario3);
    this.usuariosHardcodeados.push(xUsuario4);
  }

  deleteUser(pUsuario:user):void{
    let url = this.webApiUrl + "borrarUser";
    this.http.post<any>(url,{mail:pUsuario.mail});
  }

  editUser(pUsuario: user,pNuevoMail:String,pNuevoRol:String):void{
    let url = this.webApiUrl + "editarUser";
    this.http.post<any>(url,{ mail:pUsuario.mail,nuevoMail:pNuevoMail,rol:pNuevoRol});
  }

  createUser(mail: string, pass: string, rol: string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/crearUser', { mail, pass, rol }, { headers }
    )
  }

}

