import { Component, OnInit, ViewChild } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { ListService } from 'src/app/services/list.service';


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

  add(part: windmillPart) {
    this.listService.addWindmillPart(part);

  }
  getWindmillParts(): void {
    this.windmillParts = this.listService.getWindmillParts();

  }

  deleteCatalogo(deletePart: windmillPart) {
    this.listService.deleteWindmillPart(deletePart);
  }

  editCatalogo(editPart: windmillPart) {
    this.listService.editWindmillPart(editPart);
  }


}
