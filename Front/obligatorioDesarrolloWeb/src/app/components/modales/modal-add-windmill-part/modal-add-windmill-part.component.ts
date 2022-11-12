import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ListService } from 'src/app/services/list.service';

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


  // addForm = new FormGroup({

  //   newName: new FormControl('', Validators.required),
  //   newCategory: new FormControl('', Validators.required),
  //   newPicture: new FormControl('', Validators.required),
  //   newHeight: new FormControl('', Validators.required),
  //   newWind: new FormControl('', Validators.required),
  //   newMaterial: new FormControl('', Validators.required)
  // })

  // newWindmillPart() {

  //   let objectForm = this.addForm.value;

  //   if (objectForm.newCategory === "base") {
  //     this.addForm.value.newCategory = "1"
  //   } else if (objectForm.newCategory === "cuerpo") {
  //     this.addForm.value.newCategory = "2"
  //   } else if (objectForm.newCategory === "aspa") {
  //     this.addForm.value.newCategory = "3"
  //   }

  //   //Pasar al servicio un windmillPart o un objeto???

  //   //this.newItemEvent.emit(this.addForm);
  // }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  addNewItem(pname: string, pcategory: string, pheight: number, pwind: number, pmaterial: string, ppicture: string) {

    let numberCategory: number = 0;
    if (pcategory === "base") {
      numberCategory = 1;
    } else if (pcategory === "cuerpo") {
      numberCategory = 2;
    } else if (pcategory === "aspa") {
      numberCategory = 3;
    }


    let newPart: windmillPart = {
      id: "123", //cambiar esto y ver como hacer
      cat: numberCategory, // ver que hacer con esto
      picture: ppicture,
      height: pheight,
      windResistance: pwind,
      material: pmaterial,
      name: pname,
      inUse: false,
    }

    this.listService.addWindmillPart(newPart)
  }

}