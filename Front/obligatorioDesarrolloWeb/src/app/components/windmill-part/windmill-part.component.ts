import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {

  @Output() deleteFromCatalogo = new EventEmitter<windmillPart>();
  @Output() editFromCatalogo = new EventEmitter<windmillPart[]>();
  @Input() coso: windmillPart | undefined;


  constructor(private location: Location, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  editWindmillPart(newPart: windmillPart): void {
    let editWindmills: windmillPart[] = [];
    if (this.coso != undefined) {
      editWindmills = [newPart, this.coso];
    }
    this.editFromCatalogo.emit(editWindmills)
  }
  deleteWindmillPart() {
    this.deleteFromCatalogo.emit(this.coso);
  }

}
