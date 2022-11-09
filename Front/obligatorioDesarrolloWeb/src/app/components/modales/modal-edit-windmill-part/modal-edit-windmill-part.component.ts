import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-modal-edit-windmill-part',
  templateUrl: './modal-edit-windmill-part.component.html',
  styleUrls: ['./modal-edit-windmill-part.component.scss']
})
export class ModalEditWindmillPartComponent implements OnInit {

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

}
