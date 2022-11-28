import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  constructor(private http: HttpClient) {}

  getImg(imgName:string) {
    return this.http.get("http://localhost:8080/image/"+imgName,{responseType:"blob"})
  }
}
