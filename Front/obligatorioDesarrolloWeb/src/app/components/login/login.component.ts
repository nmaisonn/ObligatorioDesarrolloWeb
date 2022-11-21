import { Component, OnInit } from '@angular/core'
import { LoginServiceService } from 'src/app/services/login-service.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  mail: string = ''
  pass: string = ''

  constructor(private _login: LoginServiceService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  loginUser(mail: string, pass: string) {
    console.log("HOLA")
    this._login.loginUser(mail, pass).subscribe(
      (res) => {
        console.log(res)
        localStorage.setItem("token", res.token)
        localStorage.setItem("mail", res.user.mail)
        if (res.user.rol == "1") {
          this.router.navigate(["/createUser"])
        } else if (res.user.rol == "2") {
          this.router.navigate(["/creation"])
        } else {
          this.router.navigate(["/approve"])
        }
        this._snackBar.open(res.msg, "cerrar", {
          duration: 10000,
        });
      },
      (err) => {
        this._snackBar.open(err.error.error, "cerrar", {
          duration: 10000,
        });
      })
  }
}
