import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { ListService } from 'src/app/services/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';


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

  constructor(config: NgbModalConfig, private modalService: NgbModal, private listService: ListService, private _snackBar: MatSnackBar) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;


  }

  ngOnInit(): void {
    this.newName = this.windmillPartEdit.nombre;
    this.newCategory = this.windmillPartEdit.categori;
    this.newPicture = this.windmillPartEdit.img;
    this.newHeight = this.windmillPartEdit.altura;
    this.newWind = this.windmillPartEdit.resistenciaEolica;
    this.newMaterial = this.windmillPartEdit.material
  }



  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }


  editModal(pname: string, pheight: number, pwind: number, pmaterial: string, ppicture: string) {
    this.windmillPartEdit.name = pname;
    this.windmillPartEdit.height = pheight;
    this.windmillPartEdit.windResistance = pwind;
    this.windmillPartEdit.material = pmaterial;
    this.windmillPartEdit.picture = ppicture;
    this.listService.editWindmillPart(this.windmillPartEdit).subscribe((res) => {
      console.log(res)
      this._snackBar.open(res.msg, "cerrar", {
        duration: 10000,
      });
    }, (err) => {
      this._snackBar.open(err.error.error, "cerrar", {
        duration: 10000,
      });
    });
    this.modalService.dismissAll();
  }

}

