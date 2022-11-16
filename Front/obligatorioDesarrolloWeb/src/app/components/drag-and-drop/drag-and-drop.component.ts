import { CdkDrag, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { windmillPart } from 'src/app/windmillPart';
import { WindmillService } from 'src/app/services/windmill.service';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss']
})
export class DragAndDropComponent implements OnInit {

  public baseList: windmillPart[] = [];
  public aspaList: windmillPart[] = [];
  public cuerpoList: windmillPart[] = [];

  constructor(private windmillService: WindmillService) { }

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
    return item.data.cat === 2;
  }

  predicateBase(item: CdkDrag<windmillPart>) {
    return item.data.cat === 3;
  }

  agregarMolino() {
    if (this.aspaList.length === 1 && this.baseList.length === 1 && this.cuerpoList.length == 1) {
      let aspa = this.aspaList.pop();
      let base = this.baseList.pop();
      let cuerpo = this.cuerpoList.pop();

      if (aspa != undefined && cuerpo != undefined && base != undefined) {
        this.windmillService.addWindmill(aspa, base, cuerpo).subscribe();
      }
    }
  }

}
