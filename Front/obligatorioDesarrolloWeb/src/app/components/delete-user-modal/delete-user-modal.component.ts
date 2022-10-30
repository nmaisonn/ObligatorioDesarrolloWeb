import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { user } from 'src/app/user';

@Component({
  selector: 'app-delete-user-modal',
  templateUrl: './delete-user-modal.component.html',
  styleUrls: ['./delete-user-modal.component.scss']
})
export class DeleteUserModalComponent implements OnInit {

  
  @Input() usuario : user | undefined;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

}
