import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  @Input() usuario: user | any;

  nuevoMail: String = '';
  nuevoRol: String = '';

  constructor(private userService: UserService, private modalService: NgbModal, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }

  editUser(pNuevoMail: String, pNuevoRol: String) {
    console.log(pNuevoMail, pNuevoRol);
    this.userService.editUser(this.usuario, this.nuevoMail, this.nuevoRol).subscribe((res) => {
      console.log(res)
      this._snackBar.open(res.msg, "cerrar", {
        duration: 10000,
      });
      window.location.reload()
    }, (err) => {
      this._snackBar.open(err.error.error, "cerrar", {
        duration: 10000,
      });
    });
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }
}
