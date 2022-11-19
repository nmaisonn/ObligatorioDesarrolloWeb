import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';
import { windmillPart } from 'src/app/windmillPart';

@Component({
  selector: 'app-detail-windmill-modal',
  templateUrl: './detail-windmill-modal.component.html',
  styleUrls: ['./detail-windmill-modal.component.scss']
})
export class DetailWindmillModalComponent implements OnInit {


  @Input() molino: windmill | any;
  @Input() aspa: windmillPart | any;
  @Input() cuerpo: windmillPart | any;
  @Input() base: windmillPart | any;

  constructor(private windmillService: WindmillService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
  }

  approveWindmill() {
    let id: String = this.molino._id;
    this.windmillService.auditar(id, true).subscribe((res) => {
      window.location.reload()
    });
    this.modalService.dismissAll();
  }

  rejectedWindmill() {
    let id: String = this.molino._id;
    this.windmillService.auditar(id, false).subscribe((res) => {
      window.location.reload()
    });;
    this.modalService.dismissAll();
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }

}
