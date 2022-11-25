import { Component, Input, OnInit } from '@angular/core';
import { Windmill } from '../windmill';
import { WindmillPart } from '../windmill-part';

@Component({
  selector: 'app-molinos-componente',
  templateUrl: './molinos-componente.component.html',
  styleUrls: ['./molinos-componente.component.scss'],
})
export class MolinosComponenteComponent implements OnInit {

  @Input() windmill: Windmill | any;
  aspa: WindmillPart | any;
  cuerpo: WindmillPart | any;
  base: WindmillPart | any;
  
  constructor() {
    
   }

  ngOnInit() {
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
