import { Component, OnInit } from '@angular/core';
import { CreateUserService } from 'src/app/services/create-user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  mail: string = ""
  pass: string = ""
  rol: string = ""

  constructor(private _create: CreateUserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  createUser(mail: string, pass: string, rol: string) {
    this._create.createUser(mail, pass, rol).subscribe(
      (res) => {
        this._snackBar.open(res.msg, "cerrar", {
          duration: 10000,
        });
      },
      (err) => {
        this._snackBar.open(err.error.error, "cerrar", {
          duration: 10000,
        });
      },
    )
  }

}