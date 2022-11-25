import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from 'src/app/services/list.service';
import { ImagenesService } from 'src/app/services/imagenes.service';

@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {
  @Input() coso: windmillPart | any;
  imagen: any;

  constructor(private location: Location, private route: ActivatedRoute, private modalService: NgbModal, private listService: ListService, private imagenService: ImagenesService) { }

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

  deleteWindmillPart() {
    console.log(this.coso)
    this.listService.deleteWindmillPart(this.coso._id).subscribe((res)=>{
      console.log(res)
      window.location.reload()
    })

  }
}