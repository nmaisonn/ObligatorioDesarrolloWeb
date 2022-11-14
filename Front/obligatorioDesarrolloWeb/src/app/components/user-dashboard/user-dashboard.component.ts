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

  constructor(private userService: UserService, private modalService: NgbModal) { }

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
}
