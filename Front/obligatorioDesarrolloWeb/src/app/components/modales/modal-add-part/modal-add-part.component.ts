
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';

@Component({
  selector: 'app-modal-add-part',
  templateUrl: './modal-add-part.component.html',
  styleUrls: ['./modal-add-part.component.scss']
})
export class ModalAddPartComponent implements OnInit {
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

  goBack(): void {
    this.location.back();
  }

  deleteModal() {
    this.deleteNote.emit();
  }
  constructor(config: NgbModalConfig, private modalService: NgbModal, private location: Location, private route: ActivatedRoute) {
    // customize default values of modals used by this component tree
    config.backdrop = "static";
    config.keyboard = false;

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
