import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeletePartComponent } from '../modales/modal-delete-part/modal-delete-part.component';

@Component({
  selector: 'app-windmill-part',
  templateUrl: './windmill-part.component.html',
  styleUrls: ['./windmill-part.component.scss']
})
export class WindmillPartComponent implements OnInit {


  @Input() coso: windmillPart | undefined;


  constructor(private location: Location, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  editNote(): void {

  }

}
