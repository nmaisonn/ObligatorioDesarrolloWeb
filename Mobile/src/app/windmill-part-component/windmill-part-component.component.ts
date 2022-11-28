import { Component, Input, OnInit } from '@angular/core';
import { ImagenesService } from '../imagenes.service';
import { WindmillPart } from '../windmill-part';

@Component({
  selector: 'app-windmill-part-component',
  templateUrl: './windmill-part-component.component.html',
  styleUrls: ['./windmill-part-component.component.scss'],
})
export class WindmillPartComponentComponent implements OnInit {

  @Input() windmillPart: WindmillPart | any;
  imagen: any;

  constructor(private imagenService: ImagenesService) { }

  ngOnInit(): void {
    this.imagenService.getImg(this.windmillPart.img).subscribe((res)=>{
     this.blobToImage(res);

    })
  }

  blobToImage(theBlob : Blob){
    let reader = new FileReader();
    reader.addEventListener("load",() =>{
      this.imagen = reader.result;
    },false)
    if(theBlob){
      reader.readAsDataURL(theBlob);
    }
  }

}
