import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from 'src/login-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  mail: string = ''
  pass: string = ''

  constructor(private _login: LoginServiceService, private router: Router) {}

  loginUser(mail: string, pass: string) {
    console.log("llegue al login")
    this._login.loginUser(mail, pass).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem("token", res.token)
        localStorage.setItem("mail", res.user.mail)
      },
      (err) => console.log(err),
    )
  }
}
