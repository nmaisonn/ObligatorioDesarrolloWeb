import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class LoginServiceService {
  constructor(private http: HttpClient) {}

  loginUser(mail: string, pass: string) {
    console.log(mail)
    let params: URLSearchParams = new URLSearchParams()
    params.set('mail', mail)
    params.set('pass', pass)
    return this.http.post<any>(
      'http://localhost:8080/login?mail=' + mail + '&pass=' + pass,
      {},
    )
  }
}
