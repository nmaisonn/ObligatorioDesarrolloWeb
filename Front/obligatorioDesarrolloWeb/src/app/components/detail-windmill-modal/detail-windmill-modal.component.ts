import { Component, EventEmitter, Input, OnInit, Output,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-detail-windmill-modal',
  templateUrl: './detail-windmill-modal.component.html',
  styleUrls: ['./detail-windmill-modal.component.scss']
})
export class DetailWindmillModalComponent implements OnInit {

//  @Input() molino : windmill| undefined;
  molino:windmill| any;

  constructor(public dialogRef: MatDialogRef<DetailWindmillModalComponent>, @Inject(MAT_DIALOG_DATA) public data: windmill,private windmillService: WindmillService)  { 
    this.molino=data;
  }

  ngOnInit(): void {
  }

  approveWindmill(){
    let id:String =this.molino?.id;
    this.windmillService.approve(id);
  }

  rejectedWindmill(){
    let id:String =this.molino?.id;
    this.windmillService.reject(id);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
