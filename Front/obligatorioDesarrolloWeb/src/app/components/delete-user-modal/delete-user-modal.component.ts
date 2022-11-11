import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  usuario : user | any;

  constructor(public dialogRef: MatDialogRef<DeleteUserModalComponent>, @Inject(MAT_DIALOG_DATA) public data: user,private userService: UserService) {
    this.usuario = data;
  }

  ngOnInit(): void {
  }

  closeModal() {
    this.dialogRef.close();
  }

  deleteUser(){
    this.userService.deleteUser(this.usuario);
  }
}
