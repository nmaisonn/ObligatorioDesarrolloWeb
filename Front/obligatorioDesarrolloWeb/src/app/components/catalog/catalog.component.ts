import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { PARTES } from 'src/app/partes';
import { ListService } from 'src/app/services/list.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  windmillParts: windmillPart[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getWindmillParts();
  }
  getWindmillParts(): void {
    this.listService.getWindmillParts().subscribe(windmillParts => this.windmillParts = windmillParts);
  }

}
