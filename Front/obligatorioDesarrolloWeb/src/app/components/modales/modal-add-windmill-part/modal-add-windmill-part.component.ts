import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ListService } from 'src/app/services/list.service';
//import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal-add-windmill-part',
  templateUrl: './modal-add-windmill-part.component.html',
  styleUrls: ['./modal-add-windmill-part.component.scss']
})
export class ModalAddWindmillPartComponent implements OnInit {


  @Output() newItemEvent = new EventEmitter<windmillPart>();

  newName: string = '';
  newCategory: string = "";
  newPicture: string = "";
  newHeight: number = 0;
  newWind: number = 0;
  newMaterial: string = "";

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal, private location: Location, private route: ActivatedRoute, private listService: ListService) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
  goBack(): void {
    this.location.back();
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addNewItem(nombre: string, categoria: string, altura: number, resViento: number, material: string, img: string) {

    let numberCategory: string = "";
    if (categoria === "base") {
      numberCategory = "1";
    } else if (categoria === "cuerpo") {
      numberCategory = "2";
    } else if (categoria === "aspa") {
      numberCategory = "3";
    }
    //this._snackBar.open("hola");

    this.listService.addWindmillPart(nombre, numberCategory, altura.toString(), resViento.toString(), material, img).subscribe((res) => {
      console.log(res)
      window.location.reload()
    });

  }

}