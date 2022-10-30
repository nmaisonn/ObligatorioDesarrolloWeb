import { Xtb } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetailWindmillModalComponent } from '../detail-windmill-modal/detail-windmill-modal.component';


@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  windmills: windmill[] = [];
  textoBuscado:string ="";

  constructor(private windmillService: WindmillService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getWindmillsHardCode();
    //this.getWindmills();
  }

  getWindmillsHardCode():void{
    this.windmills = this.windmillService.getWindmillsHardCode();
  }

  getWindmills(): void {
    this.windmillService.getWindmills()
      .subscribe(response => this.windmills = response);
  }

  findWindmills(pTexto: string): void {
    let xAux: windmill[]=[];

    for(var i=0; i < this.windmills.length;i++){
      if(this.windmills[i].state==pTexto || this.windmills[i].name==pTexto)
      {
        xAux.push(this.windmills[i]);
      }
    }
    {
      if(xAux.length > 0)
      this.windmills=xAux;
    }
  }



  showDetails(pWindmill:windmill){
    this.modalService.open(DetailWindmillModalComponent);
  }
}
