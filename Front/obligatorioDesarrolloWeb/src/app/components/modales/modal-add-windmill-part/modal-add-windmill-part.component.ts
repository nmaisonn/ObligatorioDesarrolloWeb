import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';

@Component({
  selector: 'app-modal-add-windmill-part',
  templateUrl: './modal-add-windmill-part.component.html',
  styleUrls: ['./modal-add-windmill-part.component.scss']
})
export class ModalAddWindmillPartComponent implements OnInit {

  @Output() deleteNote = new EventEmitter<string>();
  @Output() newItemEvent = new EventEmitter<windmillPart>();

  newName: string = '';
  newCategory: string = '';
  newPicture: string = "";
  newHeight: number = 0;
  newWind: number = 0;
  newMaterial: string = "";

  ngOnInit(): void {
  }

  constructor(private modalService: NgbModal, private location: Location, private route: ActivatedRoute) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }
  goBack(): void {
    this.location.back();
  }

  deleteModal() {
    this.deleteNote.emit();
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
  addNewItem(pname: string, pcategory: string, pheight: number, pwind: number, pmaterial: string, ppicture: string) {
    let newPart: windmillPart = {
      id: "123", //cambiar esto y ver como hacer
      cat: 1, // ver que hacer con esto
      picture: ppicture,
      height: pheight,
      windResistance: pwind,
      material: pmaterial,
      name: pname,
      inUse: false,
    }
    this.newItemEvent.emit(newPart);
  }

}
