import { Component, OnInit, Input } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';

@Component({
  selector: 'app-windmill-part-creation',
  templateUrl: './windmill-part-creation.component.html',
  styleUrls: ['./windmill-part-creation.component.scss']
})
export class WindmillPartCreationComponent implements OnInit {

  @Input() coso: windmillPart | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
