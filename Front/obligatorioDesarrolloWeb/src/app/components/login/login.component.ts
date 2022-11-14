import { Component, OnInit } from '@angular/core'
import { LoginServiceService } from 'src/app/services/login-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mail: string = ''
  pass: string = ''

  constructor(private _login: LoginServiceService, private router: Router) {}

  ngOnInit(): void {}

  loginUser(mail: string, pass: string) {
    this._login.loginUser(mail, pass).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem("token",res.token)
        console.log(res.rol)
        if (res.user.rol == "1") {
          this.router.navigate(["/createUser"])
        } else if (res.user.rol == "2") {
          this.router.navigate(["/creation"])
        } else {
          this.router.navigate(["/approve"])
        }
      },
      (err) => console.log(err),
    )
  }
}
