import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-windmill',
  templateUrl: './windmill.component.html',
  styleUrls: ['./windmill.component.scss']
})
export class WindmillComponent implements OnInit {

  @Input() windmill: windmill | any;
  @Output() editItem = new EventEmitter<windmill>();

  constructor() { }

  ngOnInit(): void {
  }

  changeState(value:String){
    this.windmill.state= value;
  }

  showDetails(){
    this.editItem.emit(this.windmill);
  }
 
}
