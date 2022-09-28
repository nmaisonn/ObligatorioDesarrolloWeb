import { Component, OnInit, Input } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';


@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {

  @Input() coso: windmillPart | undefined;

  constructor() { }

  ngOnInit(): void {
  }
  borrarNota(): void {

  }
  editNote(): void {

  }
}
