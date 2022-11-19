import { Component, OnInit } from '@angular/core';
import { ForgotPassService } from 'src/app/services/forgot-pass.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  mail: string = ""

  constructor(private _forgotPass: ForgotPassService) { }

  ngOnInit(): void {
  }

  forgotPass(mail: string) {
    this._forgotPass.forgotPass(mail).subscribe((res) => {
      console.log(res)
    },
      (err) => console.log(err),
    )
  }

}
