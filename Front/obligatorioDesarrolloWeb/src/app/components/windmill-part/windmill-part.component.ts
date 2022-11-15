import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ListService } from 'src/app/services/list.service';

@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {
  @Input() coso: windmillPart | any;

  constructor(private location: Location, private route: ActivatedRoute, private modalService: NgbModal, private listService: ListService) { }

  ngOnInit(): void {
  }

  // editWindmillPart(newPart: windmillPart): void {
  //   if (this.coso != undefined) {
  //     this.coso.height = newPart.height;
  //     this.coso.name = newPart.name;
  //     this.coso.windResistance = newPart.windResistance;
  //     this.coso.picture = newPart.picture;
  //     this.coso.material = newPart.material;
  //   }
  //   this.listService.editWindmillPart(this.coso);
  // }

  deleteWindmillPart() {
    this.listService.deleteWindmillPart(this.coso)

  }
}
