import { Component } from '@angular/core';
import { Windmill } from '../windmill';
import { WindmillService } from 'src//windmill.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  windmills: Windmill[] = [];

  constructor(private windmillService: WindmillService) { }

  ngOnInit(): void {
    this.getWindmills();
  }

  getWindmills(): void {
    this.windmillService.getWindmills()
    .subscribe((response) => {
      this.windmills = response.resultadoFinal});
  }


}
