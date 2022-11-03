import { Component, OnInit } from '@angular/core'
import { LoginServiceService } from 'src/app/services/login-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mail: string = ''
  pass: string = ''

  constructor(private _login: LoginServiceService) {}

  ngOnInit(): void {}

  loginUser(mail: string, pass: string) {
    console.log(mail)
    this._login.loginUser(mail, pass).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
    )
  }
}
