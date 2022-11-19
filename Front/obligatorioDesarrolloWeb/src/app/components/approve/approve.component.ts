import { Xtb } from '@angular/compiler'
import { Component, OnInit } from '@angular/core'
import { WindmillService } from 'src/app/services/windmill.service'
import { windmill } from 'src/app/windmill'
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap'
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog'
import { DetailWindmillModalComponent } from '../detail-windmill-modal/detail-windmill-modal.component'

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss'],
})
export class ApproveComponent implements OnInit {
  windmills: windmill[] = []
  textoBuscado: string = ''

  dialogConfig = new MatDialogConfig()
  modalDialog: MatDialogRef<DetailWindmillModalComponent, any> | undefined

  constructor(
    private windmillService: WindmillService,
    private modalService: NgbModal,
    public matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getWindmills();
  }


  getWindmills(): void {
    this.windmillService.getWindmills().subscribe((response) => {
      let molinos = response.resultadoFinal
      console.log(molinos)
      this.windmills = molinos
    })
  }

  findWindmills(pTexto: string): void {
    this.getWindmills();
    let xAux: windmill[] = []
    for (var i = 0; i < this.windmills.length; i++) {
      var estado = this.windmills[i].state.toLocaleLowerCase()
      var nombre = this.windmills[i].name.toLocaleLowerCase()
      if (
        estado.includes(pTexto.toLocaleLowerCase()) ||
        nombre.includes(pTexto)
      ) {
        xAux.push(this.windmills[i])
      }
    }
    if (xAux.length > 0) {
      this.windmills = xAux
    }
    //document.getElementById("buscadorMolinos").textContent = "";
  }

}
