import { Component, Input, OnInit } from '@angular/core';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-windmill',
  templateUrl: './windmill.component.html',
  styleUrls: ['./windmill.component.scss']
})
export class WindmillComponent implements OnInit {

  @Input() windmill: windmill | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  //showDetailWindmillModal(pWindmill : windmill)
  //{

  //}
}
