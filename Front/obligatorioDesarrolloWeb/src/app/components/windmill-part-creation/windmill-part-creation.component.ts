import { Component, OnInit, Input } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { ImagenesService } from 'src/app/services/imagenes.service';


@Component({
  selector: 'app-windmill-part-creation',
  templateUrl: './windmill-part-creation.component.html',
  styleUrls: ['./windmill-part-creation.component.scss']
})
export class WindmillPartCreationComponent implements OnInit {

  @Input() coso: windmillPart | any;
  imagen: any;



  constructor(private imagenService: ImagenesService) { }

  ngOnInit(): void {
    this.imagenService.getImg(this.coso.img).subscribe((res)=>{
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