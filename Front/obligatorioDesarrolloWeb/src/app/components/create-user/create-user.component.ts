import { Component, OnInit } from '@angular/core';
import { CreateUserService } from 'src/app/services/create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  mail: string = ""
  pass: string = ""
  rol: string = ""

  constructor(private _create: CreateUserService) { }

  ngOnInit(): void {
  }

  createUser(mail:string, pass:string, rol:string){
    this._create.createUser(mail, pass,rol).subscribe(
      (res) => console.log(res),
      (err) => console.log(err),
    )
  }

}