import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  @Input() usuario : user | any;

  nuevoMail:String = '';
  nuevoRol:String = '';
  
  constructor(private userService: UserService,private modalService: NgbModal) {
  }

  ngOnInit(): void {
    
  }
  
  editUser(pNuevoMail:String,pNuevoRol:String){
    console.log(pNuevoMail,pNuevoRol);
    this.userService.editUser(this.usuario,this.nuevoMail,this.nuevoRol).subscribe((res)=>{
      console.log(res)
      window.location.reload()
    },(err)=>{
      console.log(err)
    });
  }

  open(modalEdit: any): void {
    this.modalService.open(modalEdit);
  }
}
