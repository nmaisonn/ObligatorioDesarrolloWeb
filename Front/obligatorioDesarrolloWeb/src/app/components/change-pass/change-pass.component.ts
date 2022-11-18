import { Component, OnInit } from '@angular/core';
import { ChangePassService } from 'src/app/services/change-pass.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  currentPass: string = ""
  newPass1: string = ""
  newPass2: string = ""

  constructor(private _changePass: ChangePassService) { }

  ngOnInit(): void {
  }

  changePass(currentPass: string, newPass1: string, newPass2: string) {
    this._changePass.changePass(currentPass, newPass1, newPass2).subscribe((res) => {
      console.log(res)
    }, (err) => console.log(err))
  }

}
