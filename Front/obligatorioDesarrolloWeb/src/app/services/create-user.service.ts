import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateUserService {

  constructor(private http: HttpClient) { }

  createUser(mail: string, pass: string, rol: string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/crearUser', { mail, pass, rol }
    )
  }
}
