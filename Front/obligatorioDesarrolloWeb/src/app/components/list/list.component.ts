import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { PARTES } from 'src/app/partes';
import { ListService } from 'src/app/services/list.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalAddPartComponent } from '../modales/modal-add-part/modal-add-part.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  windmillParts: windmillPart[] = [];

  constructor(private listService: ListService) { }

  ngOnInit(): void {
    this.getWindmillParts();
  }


  getWindmillParts(): void {
    this.windmillParts = this.listService.getWindmillParts();

  }



  drop($event: CdkDragDrop<windmillPart[]>) {
    // //Obtenemos el elemento
    const element = ($event.previousContainer.data as Array<windmillPart>)[
      $event.previousIndex
    ];

    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    } else { //lo muevo de lista
      transferArrayItem(
        $event.previousContainer.data, //de donde viene
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }

  }


}
