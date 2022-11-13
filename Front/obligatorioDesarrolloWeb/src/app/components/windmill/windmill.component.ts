import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-windmill',
  templateUrl: './windmill.component.html',
  styleUrls: ['./windmill.component.scss']
})
export class WindmillComponent implements OnInit {

  @Input() windmill: windmill | any;

  constructor() { }

  ngOnInit(): void {
  }

  
 
}
