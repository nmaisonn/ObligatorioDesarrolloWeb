import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { PARTES } from 'src/app/partes';
import { ListService } from 'src/app/services/list.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  windmillParts: any[] = [];
  textoBuscado: string = ''

  constructor(private listService: ListService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getWindmillParts();
  }
  getWindmillParts(): void {
    this.listService.getWindmillParts().subscribe(res => {
      console.log(res)
      this.windmillParts = res.parts
    });
  }
  findWindmillParts(pTexto: string): void {
    let xAux: windmillPart[] = []

    for (var i = 0; i < this.windmillParts.length; i++) {
      var material = this.windmillParts[i].material.toLowerCase()
      var nombre = this.windmillParts[i].nombre.toLowerCase()
      if (
        material.includes(pTexto.toLowerCase()) ||
        nombre.includes(pTexto.toLowerCase())
      ) {
        xAux.push(this.windmillParts[i])
      }
    }
    if (xAux.length > 0) {
      this.windmillParts = xAux
    }

  }

}
