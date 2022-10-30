import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { PARTES } from 'src/app/partes';
import { ListService } from 'src/app/services/list.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddPartComponent } from '../modales/modal-add-part/modal-add-part.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  windmillParts: windmillPart[] = [];

  constructor(private listService: ListService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getWindmillParts();
  }

  agregar(part: windmillPart) {
    this.listService.addWindmillPart(part);

  }
  getWindmillParts(): void {
    this.windmillParts = this.listService.getWindmillParts();

  }

  open() {
    this.modalService.open(ModalAddPartComponent);
  }


}
