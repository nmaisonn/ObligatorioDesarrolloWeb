import { Component, Input, OnInit } from '@angular/core';
import { WindmillPart } from '../windmill-part';

@Component({
  selector: 'app-windmill-part-component',
  templateUrl: './windmill-part-component.component.html',
  styleUrls: ['./windmill-part-component.component.scss'],
})
export class WindmillPartComponentComponent implements OnInit {

  @Input() windmillPart: WindmillPart | any;

  constructor() { }

  ngOnInit() {}

}
