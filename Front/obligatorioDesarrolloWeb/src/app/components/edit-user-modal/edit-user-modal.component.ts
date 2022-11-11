import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  nuevoMail:String = '';
  nuevoRol:String = '';
  usuario : user | any;

  constructor(public dialogRef: MatDialogRef<EditUserModalComponent>, @Inject(MAT_DIALOG_DATA) public data: user,private userService: UserService) {
    this.usuario = data;
  }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.dialogRef.close();
  }

  editUser(pNuevoMail:String,pNuevoRol:String){
    this.userService.editUser(this.usuario,pNuevoMail,pNuevoRol);
  }
}
