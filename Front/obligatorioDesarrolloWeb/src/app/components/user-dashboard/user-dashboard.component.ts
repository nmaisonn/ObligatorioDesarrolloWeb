import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { DetailWindmillModalComponent } from '../detail-windmill-modal/detail-windmill-modal.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  users: user[] = [];
  dialogConfigEdit = new MatDialogConfig();
  modalDialogEdit: MatDialogRef<EditUserModalComponent, any> | undefined;
  dialogConfigDelete = new MatDialogConfig();
  modalDialogDelete: MatDialogRef<DeleteUserModalComponent, any> | undefined;

  constructor(private userService: UserService, private modalService: NgbModal, public matDialogEdit: MatDialog,public matDialogDelete: MatDialog) { }

  ngOnInit(): void {
    this.getUserHardCode();
    //this.getUsers();
  }

  getUserHardCode():void{
    this.users = this.userService.getUserHardCode();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(response => this.users = response);
  }

  
  editUser(pUsuario:user){
    this.dialogConfigEdit.id = "detail-modal-component";
    this.dialogConfigEdit.height = "500px";
    this.dialogConfigEdit.width = "650px";
    this.dialogConfigEdit.autoFocus=true;
    this.dialogConfigEdit.data = pUsuario;
    this.modalDialogEdit = this.matDialogEdit.open(EditUserModalComponent, this.dialogConfigEdit);

    this.modalService.open(EditUserModalComponent);
  }
  
  deleteUser(pUsuario:user){
    this.dialogConfigDelete.id = "detail-modal-component";
    this.dialogConfigDelete.height = "500px";
    this.dialogConfigDelete.width = "650px";
    this.dialogConfigDelete.autoFocus=true;
    this.dialogConfigDelete.data = pUsuario;
    this.modalDialogDelete = this.matDialogDelete.open(DeleteUserModalComponent, this.dialogConfigDelete);
  }


}
