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
    // this.getWindmillsHardCode();
    this.getWindmills()
  }

  getWindmillsHardCode(): void {
    this.windmills = this.windmillService.getWindmillsHardCode()
  }

  getWindmills(): void {
    this.windmillService.getWindmills().subscribe((response) => {
      let molinos = response.resultadoFinal
      console.log(molinos)
      this.windmills = response.resultadoFinal
    })
  }

  findWindmills(pTexto: string): void {
    //this.getWindmills();
    this.getWindmillsHardCode()
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

  showDetails(pWindmill: windmill) {
    this.dialogConfig.id = 'detail-modal-component'
    this.dialogConfig.height = '500px'
    this.dialogConfig.width = '650px'
    this.dialogConfig.autoFocus = true
    this.dialogConfig.data = pWindmill
    this.modalDialog = this.matDialog.open(
      DetailWindmillModalComponent,
      this.dialogConfig,
    )
  }
}
