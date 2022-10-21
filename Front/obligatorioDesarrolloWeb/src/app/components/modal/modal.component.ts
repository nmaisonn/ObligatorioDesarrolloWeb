import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Output() deleteNote = new EventEmitter<string>();
  @Input() newItemEvent = new EventEmitter<windmillPart>();




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
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content: any) {
    this.modalService.open(content);
  }

  addNewItem(value: windmillPart) {
    this.newItemEvent.emit(value);
  }
}
