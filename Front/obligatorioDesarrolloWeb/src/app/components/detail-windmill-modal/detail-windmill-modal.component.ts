import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-detail-windmill-modal',
  templateUrl: './detail-windmill-modal.component.html',
  styleUrls: ['./detail-windmill-modal.component.scss']
})
export class DetailWindmillModalComponent implements OnInit {


  @Input() molino: windmill | any;

  constructor(private windmillService: WindmillService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  approveWindmill() {
    let id: String = this.molino?.id;
    this.windmillService.approve(id);
    this.modalService.dismissAll();
  }

  rejectedWindmill() {
    let id: String = this.molino?.id;
    this.windmillService.reject(id);
    this.modalService.dismissAll();
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }

}
