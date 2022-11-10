import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';


@Component({
  selector: 'app-modal-edit-windmill-part',
  templateUrl: './modal-edit-windmill-part.component.html',
  styleUrls: ['./modal-edit-windmill-part.component.scss']
})
export class ModalEditWindmillPartComponent implements OnInit {

  @Output() editPart = new EventEmitter<any>();
  @Input() windmillPartEdit: windmillPart | undefined;

  newName: string = '';
  newCategory: string = "";
  newPicture: string = "";
  newHeight: number = 0;
  newWind: number = 0;
  newMaterial: string = "";

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }

  editModal(pname: string, pheight: number, pwind: number, pmaterial: string, ppicture: string) {
    let newPart: windmillPart = {
      id: "123", //cambiar esto y ver como hacer
      cat: 100, // ver que hacer con esto
      picture: ppicture,
      height: pheight,
      windResistance: pwind,
      material: pmaterial,
      name: pname,
      inUse: false,
    }
    this.editPart.emit(newPart);
  }

}
