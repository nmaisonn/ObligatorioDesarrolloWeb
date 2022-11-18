import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePassService {

  constructor(private http: HttpClient) { }

  changePass(currentPass: string, newPass1: string, newPass2: string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    return this.http.post<any>(
      'http://localhost:8080/actualizarPass', { mail: localStorage.getItem("mail"), currentPass, newPass1, newPass2 }, { headers })
  }
}
