import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  users: user[] = [];

  constructor(private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getUserHardCode();
    //this.getUsers();
  }

  getUserHardCode():void{
    this.users = this.userService.getUserHardCode();
  }

  getUsers(): void {
    this.userService.getWindmills()
      .subscribe(response => this.users = response);
  }

  
  editUser(pUsuario:user){
    this.modalService.open(EditUserModalComponent);
  }
  
  deleteUser(pUsuario:user){
    this.modalService.open(DeleteUserModalComponent);
  }


}
