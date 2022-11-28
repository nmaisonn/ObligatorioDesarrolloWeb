import { Component, Input, OnInit } from '@angular/core';
import { ImagenesService } from '../imagenes.service';
import { Windmill } from '../windmill';
import { WindmillPart } from '../windmill-part';

@Component({
  selector: 'app-molinos-componente',
  templateUrl: './molinos-componente.component.html',
  styleUrls: ['./molinos-componente.component.scss'],
})
export class MolinosComponenteComponent implements OnInit {

  @Input() windmill: Windmill | any;
  aspa: WindmillPart | any;
  cuerpo: WindmillPart | any;
  base: WindmillPart | any;
  imagenAspa: any;
  imagenCuerpo: any;
  imagenBase: any;



  constructor(private imagenService: ImagenesService) { }

  ngOnInit(): void {
    this.windmill.piezas.forEach((pieza: any) => {
      console.log(pieza.categoria);
      if (pieza.categoria == "3") {
        this.aspa = pieza;
      } else if (pieza.categoria == "2") {
        this.cuerpo = pieza;
      }
      else if (pieza.categoria == "1") {
        this.base = pieza;
      }
    });
    this.imagenService.getImg(this.aspa.img).subscribe((res) => {
      this.blobToImageAspa(res);
    })
    this.imagenService.getImg(this.cuerpo.img).subscribe((res) => {
      this.blobToImageCuerpo(res);
    })
    this.imagenService.getImg(this.base.img).subscribe((res) => {
      this.blobToImageBase(res);
    })
  }

  blobToImageAspa(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenAspa = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
  }

  blobToImageCuerpo(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenCuerpo = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
  }

  blobToImageBase(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenBase = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
  }


}
