import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  @Input() usuario: user | any;

  constructor(private userService: UserService, private modalService: NgbModal, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }



  deleteUser() {
    this.userService.deleteUser(this.usuario).subscribe((res) => {
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

  open(modalEliminar: any): void {
    this.modalService.open(modalEliminar);
  }
}
