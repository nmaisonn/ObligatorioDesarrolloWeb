import { Component } from '@angular/core';
import { WindmillPartService } from 'src/windmill-part.service';
import { WindmillPart } from '../windmill-part';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

windmillsParts : WindmillPart[] =[]

constructor(private windmillPartService: WindmillPartService) { }

ngOnInit(): void {
  this.getWindmillParts();
}

getWindmillParts(): void {
  this.windmillPartService.getWindmillParts().subscribe(res => {
    console.log(res.parts)
    this.windmillsParts = res.parts
  });
}
}
