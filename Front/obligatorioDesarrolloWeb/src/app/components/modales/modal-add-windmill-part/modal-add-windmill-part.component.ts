import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { windmillPart } from 'src/app/windmillPart';
import { Location } from '@angular/common';
import { ListService } from 'src/app/services/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ImagenesService } from 'src/app/services/imagenes.service';

class ImageSnippet {
  constructor(public src: string, public file: File) { }
}

@Component({
  selector: 'app-modal-add-windmill-part',
  templateUrl: './modal-add-windmill-part.component.html',
  styleUrls: ['./modal-add-windmill-part.component.scss']
})
export class ModalAddWindmillPartComponent implements OnInit {


  @Output() newItemEvent = new EventEmitter<windmillPart>();

  newName: string = '';
  newCategory: string = "";
  selectedFile: ImageSnippet | any;
  imgUrl: string = ""
  newHeight: number = 0;
  newWind: number = 0;
  newMaterial: string = "";

  ngOnInit(): void {
  }

  constructor(private imgService: ImagenesService,private modalService: NgbModal, private location: Location,
    private route: ActivatedRoute, private listService: ListService, private _snackBar: MatSnackBar) { }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  processFile(imageInput:any){
    const file:File = imageInput.files[0]
    console.log(file)
    const reader = new FileReader()

    reader.addEventListener("load",(event:any)=>{
      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.imgService.upload(this.selectedFile.file).subscribe((res)=>{
        console.log(res)
        this.imgUrl = res.filename
      })
    })

    reader.readAsDataURL(file)
  }

  addNewItem(nombre: string, categoria: string, altura: number, resViento: number, material: string) {
    let numberCategory: string = "";
    if (categoria === "base") {
      numberCategory = "1";
    } else if (categoria === "cuerpo") {
      numberCategory = "2";
    } else if (categoria === "aspa") {
      numberCategory = "3";
    }

    console.log(this.imgUrl)


    this.listService.addWindmillPart(nombre, numberCategory, altura.toString(), resViento.toString(), material, this.imgUrl).subscribe((res) => {
      console.log(res)
      this._snackBar.open(res.msg, "cerrar", {
        duration: 10000,
      });
      window.location.reload()
    }, (err) => {
      this._snackBar.open(err.error.error, "cerrar", {
        duration: 10000,
      });

    });

    this.modalService.dismissAll();


  }

}