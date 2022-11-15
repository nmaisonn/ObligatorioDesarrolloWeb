import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {

  @Output() deleteFromCatalogo = new EventEmitter<windmillPart>();
  @Output() editFromCatalogo = new EventEmitter<windmillPart>();
  @Input() coso: windmillPart | any;

  constructor(private location: Location, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  borrarNota(): void {

  }
  editNote(): void {

  }

}
