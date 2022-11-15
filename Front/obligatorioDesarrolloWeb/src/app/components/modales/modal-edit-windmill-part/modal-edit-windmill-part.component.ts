import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { ListService } from 'src/app/services/list.service';


@Component({
  selector: 'app-modal-edit-windmill-part',
  templateUrl: './modal-edit-windmill-part.component.html',
  styleUrls: ['./modal-edit-windmill-part.component.scss']
})
export class ModalEditWindmillPartComponent implements OnInit {

  @Output() editPart = new EventEmitter<windmillPart>();
  @Input() windmillPartEdit: windmillPart | any;

  newName: string = '';
  newCategory: string = "";
  newPicture: string = "";
  newHeight: number = 0;
  newWind: number = 0;
  newMaterial: string = "";

  constructor(config: NgbModalConfig, private modalService: NgbModal, private listService: ListService,) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;


  }
  ngOnInit(): void {
    this.newName = this.windmillPartEdit.name;
    this.newCategory = this.windmillPartEdit.cat;
    this.newPicture = this.windmillPartEdit.picture;
    this.newHeight = this.windmillPartEdit.height;
    this.newWind = this.windmillPartEdit.windResistance;
    this.newMaterial = this.windmillPartEdit.material
  }

  // editForm = new FormGroup({
  //   newName: new FormControl(this.windmillPartEdit.name),
  //   newCategory: new FormControl(this.windmillPartEdit.cat), //Como hacer para que no de error el valor del windmillPart.
  //   newPicture: new FormControl(this.windmillPartEdit.picture),
  //   newHeight: new FormControl(),
  //   newWind: new FormControl(),
  //   newMaterial: new FormControl("hola")
  // })

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }

  // editWindmill() {
  //   this.listService.editWindmillPart(this.windmillPartEdit);
  // }

  editModal(pname: string, pheight: number, pwind: number, pmaterial: string, ppicture: string) {

    this.windmillPartEdit.name = pname;
    this.windmillPartEdit.height = pheight;
    this.windmillPartEdit.windResistance = pwind;
    this.windmillPartEdit.material = pmaterial;
    this.windmillPartEdit.picture = ppicture;
    this.listService.editWindmillPart(this.windmillPartEdit);
  }

}

