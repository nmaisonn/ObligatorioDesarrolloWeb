import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { windmill } from 'src/app/windmill';
import { windmillPart } from 'src/app/windmillPart';

@Component({
  selector: 'app-windmill',
  templateUrl: './windmill.component.html',
  styleUrls: ['./windmill.component.scss']
})
export class WindmillComponent implements OnInit {

  @Input() windmill: windmill | any;

  aspa: windmillPart | any;
  cuerpo: windmillPart | any;
  base: windmillPart | any;
  constructor() {
  }

  ngOnInit(): void {
    this.windmill.piezas.forEach((pieza: any) => {
      console.log(pieza.categoria);
      if (pieza.categoria == "3") {
        this.aspa = pieza;
      } else if (pieza.categoria == "2") {
        this.cuerpo = pieza;
      }
      else if (pieza.categoria == "1") {
        this.base = pieza;
      }
    });
  }
}
