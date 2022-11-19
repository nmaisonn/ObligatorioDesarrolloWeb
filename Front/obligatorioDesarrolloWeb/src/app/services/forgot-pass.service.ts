import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotPassService {

  constructor(private http: HttpClient) { }

  forgotPass(mail: string) {
    return this.http.post<any>(
      'http://localhost:8080/forgotPass',
      {
        mail
      },
    )
  }
}
