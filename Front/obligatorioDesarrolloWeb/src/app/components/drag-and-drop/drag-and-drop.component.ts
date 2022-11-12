import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {


  public baseList: windmillPart[] = [];
  public aspaList: windmillPart[] = [];
  public cuerpoList: windmillPart[] = [];

  constructor() { }

  ngOnInit(): void {
    this.aspaList = [];
    this.baseList = [];
    this.cuerpoList = [];
  }

  drop($event: CdkDragDrop<windmillPart[]>) {
    //lo muevo dentro de la misma lista

    if ($event.previousContainer === $event.container) {
      moveItemInArray(
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    } else if ($event.container.data.length < 1) { //lo muevo de lista
      transferArrayItem(
        $event.previousContainer.data, //de donde viene
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex
      )
    }

  }

  predicateAspa(item: CdkDrag<windmillPart>) {

    return item.data.cat === 1;
  }
  predicateCuerpo(item: CdkDrag<windmillPart>) {
    //return this.cuerpoList.length < 1 && item.data.cat === 2;
    return item.data.cat === 2;
  }

  predicateBase(item: CdkDrag<windmillPart>) {
    //return this.baseList.length <= 1 && item.data.cat === 3;
    return item.data.cat === 3;
  }


}
