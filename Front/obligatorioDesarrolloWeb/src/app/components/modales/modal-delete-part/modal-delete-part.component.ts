import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-delete-part',
  templateUrl: './modal-delete-part.component.html',
  styleUrls: ['./modal-delete-part.component.scss']
})
export class ModalDeletePartComponent implements OnInit {

  @Output() deletePart = new EventEmitter<any>();
  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  open(modalDelete: any): void {
    this.modalService.open(modalDelete);
  }

  deleteModal() {
    this.deletePart.emit();
  }
}
