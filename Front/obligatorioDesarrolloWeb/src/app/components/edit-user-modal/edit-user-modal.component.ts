import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from 'src/app/user';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss']
})
export class EditUserModalComponent implements OnInit {

  
  @Input() usuario : user | undefined;
  @Output() newItemEvent = new EventEmitter<user>();

  constructor() { }

  ngOnInit(): void {
  }

}
