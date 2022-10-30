import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from 'src/app/user';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() usuario: user | any;
  @Output() editItem = new EventEmitter<user>();
  @Output() deleteItem = new EventEmitter<user>();

  
  constructor() { }

  ngOnInit(): void {
  }

  editUser():void{
    this.editItem.emit(this.usuario);

  }

  deleteUser():void{
    this.deleteItem.emit(this.usuario);

  }

}
