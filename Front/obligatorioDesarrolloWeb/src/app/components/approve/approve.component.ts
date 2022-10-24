import { Xtb } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { WindmillService } from 'src/app/services/windmill.service';
import { windmill } from 'src/app/windmill';

@Component({
  selector: 'app-approve',
  templateUrl: './approve.component.html',
  styleUrls: ['./approve.component.scss']
})
export class ApproveComponent implements OnInit {

  windmills: windmill[] = [];
  //texto:String ="";

  constructor(private windmillService: WindmillService) { }

  ngOnInit(): void {
    this.getWindmills();
  }

  getWindmills(): void {
    this.windmillService.getWindmills()
      .subscribe(response => this.windmills = response);
  }

  findWindmills(/*pTexto: String*/): void {
    this.windmillService.findWindmills("pTexto")
      .subscribe(response => this.windmills = response);
  }
}
