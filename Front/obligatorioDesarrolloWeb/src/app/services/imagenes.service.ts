import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  constructor(private http: HttpClient) {}

  upload(file: File) {
    const formData = new FormData();

    formData.append('image', file);

    return this.http.post<any>('http://localhost:8080/image', formData);
  }

  getImg(imgName:string) {
    return this.http.get("http://localhost:8080/image/"+imgName,{responseType:"blob"})
  }
}
