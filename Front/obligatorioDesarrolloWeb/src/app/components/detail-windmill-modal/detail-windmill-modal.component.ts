import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-detail-windmill-modal',
  templateUrl: './detail-windmill-modal.component.html',
  styleUrls: ['./detail-windmill-modal.component.scss']
})
export class DetailWindmillModalComponent implements OnInit {

  @Input() molino : windmill| undefined;
  @Output() newItemEvent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  approveWindmill(){
    this.newItemEvent.emit("Aprobado");
  }

  rejectedWindmill(){
    this.newItemEvent.emit("Rechazado");
  }
}
