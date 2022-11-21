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

  nombreMolino: string = '';
  descripcionMolino: string = "";

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

  predicateBase(item: any) {
    return parseInt(item.data.categoria) === 1;
  }
  predicateCuerpo(item: any) {
    return parseInt(item.data.categoria) === 2;
  }

  predicateAspa(item: any) {
    return parseInt(item.data.categoria) === 3;
  }

  agregarMolino(nombre: string, descripcion: string) {
    if (this.aspaList.length === 1 && this.baseList.length === 1 && this.cuerpoList.length == 1) {
      let aspa = this.aspaList.pop();
      let base = this.baseList.pop();
      let cuerpo = this.cuerpoList.pop();

      if (aspa != undefined && cuerpo != undefined && base != undefined) {
        this.windmillService.addWindmill(aspa, base, cuerpo, nombre, descripcion).subscribe((res) => {
          console.log(res)
          window.location.reload()
        });
      }
    }
  }

}
