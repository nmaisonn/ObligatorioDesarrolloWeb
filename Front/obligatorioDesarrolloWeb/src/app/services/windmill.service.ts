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
}
