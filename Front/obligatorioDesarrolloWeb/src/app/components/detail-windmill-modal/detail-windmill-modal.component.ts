import { Component, EventEmitter, Input, OnInit, Output, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';
import { windmillPart } from 'src/app/windmillPart';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenesService } from 'src/app/services/imagenes.service';

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
  imagenAspa: any;
  imagenCuerpo: any;
  imagenBase: any;


  constructor(private windmillService: WindmillService, private modalService: NgbModal, private _snackBar: MatSnackBar, private imagenService: ImagenesService) {
  }

  ngOnInit(): void {
    this.imagenService.getImg(this.aspa.img).subscribe((res) => {
      this.blobToImageAspa(res);
    })
    this.imagenService.getImg(this.cuerpo.img).subscribe((res) => {
      this.blobToImageCuerpo(res);
    })
    this.imagenService.getImg(this.base.img).subscribe((res) => {
      this.blobToImageBase(res);
    })
  }

  blobToImageAspa(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenAspa = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
  }

  blobToImageCuerpo(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenCuerpo = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
  }

  blobToImageBase(theBlob: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagenBase = reader.result;
    }, false)
    if (theBlob) {
      reader.readAsDataURL(theBlob);
    }
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
      this._snackBar.open(res.msg, "cerrar", {
        duration: 10000,
      });
      window.location.reload()
    }, (err) => {
      this._snackBar.open(err.error.error, "cerrar", {
        duration: 10000,
      });
    });
    this.modalService.dismissAll();
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit, { size: 'lg' });
  }

}