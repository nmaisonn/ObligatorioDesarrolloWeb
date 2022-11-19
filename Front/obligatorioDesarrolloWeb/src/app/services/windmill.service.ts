import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { windmill } from '../windmill';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { windmillPart } from '../windmillPart';

@Injectable({
  providedIn: 'root'
})
export class WindmillService {

  private webApiUrl = 'http://localhost:8080/';
  windmillsHardcodeados: windmill[] = []


  constructor(private http: HttpClient) { }

  getWindmillsHardCode(): windmill[] {
    this.cargarMolinosHardCodeados();
    return this.windmillsHardcodeados;
  }

  getWindmills() {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta = this.http.get<any>("http://localhost:8080/listarMolinos",{headers});
    return respuesta
  }

  getWindmillPart(idPart:string) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    let respuesta =  this.http.get<any>("http://localhost:8080/getPart?idPart="+idPart,{headers})
    return respuesta
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  approve(pId: String): void {
    console.log("Llego a aprobar" + pId);
    let url = this.webApiUrl + "approve/approve?molino=" + pId;
    this.http.post<any>(url, {});

  }
  reject(pId: String): void {
    console.log("Llego a rechazar" + pId);

    let url = this.webApiUrl + "approve/reject?molino=" + pId;
    this.http.post<any>(url, {});
  }

  addWindmill(aspa: any, base: any, cuerpo: any) {
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem("token") };
    const url = this.webApiUrl + "crearMolino"
    return this.http.post<any>(url, { _idBase: base._id, _idCuerpo: cuerpo._id, _idAspa: aspa._id }, { headers })
  }

  cargarMolinosHardCodeados(): void {
    let aspa1: windmillPart = {
      id: "12344",
      cat: 1,
      picture: "../../../assets/aspa.jpg",
      height: 5,
      windResistance: 5,
      material: "metal",
      name: "aspa1",
      inUse: false
    }
    let aspa2: windmillPart = {
      id: "253008",
      cat: 1,
      picture: "../../../assets/aspa.jpg",
      height: 5,
      windResistance: 5,
      material: "metal",
      name: "aspa2",
      inUse: false
    }
    let cuerpo1: windmillPart = {
      id: "33333",
      cat: 2,
      picture: "../../../assets/aspa.jpg",
      height: 10,
      windResistance: 8,
      material: "metal",
      name: "cuerpo1",
      inUse: false
    }

    let cuerpo2: windmillPart = {
      id: "444444",
      cat: 2,
      picture: "../../../assets/aspa.jpg",
      height: 10,
      windResistance: 8,
      material: "metal",
      name: "cuerpo2",
      inUse: false
    }
    let base1: windmillPart = {
      id: "34455",
      cat: 3,
      picture: "../../../assets/aspa.jpg",
      height: 3,
      windResistance: 10,
      material: "metal",
      name: "base1",
      inUse: false
    }

    let base2: windmillPart = {
      id: "55555",
      cat: 3,
      picture: "../../../assets/aspa.jpg",
      height: 3,
      windResistance: 10,
      material: "metal",
      name: "base2",
      inUse: false
    }

    let xMolino1: windmill = {
      name: "Molino1",
      id: "1",
      base: base1,
      body: cuerpo1,
      blade: aspa1,
      state: "pendiente"
    };

    let xMolino2: windmill = {
      name: "Molino2",
      id: "2",
      base: base2,
      body: cuerpo2,
      blade: aspa2,
      state: "Aprobado"
    };

    let xMolino3: windmill = {
      name: "Molino3",
      id: "3",
      base: base1,
      body: cuerpo2,
      blade: aspa1,
      state: "Rechazado"
    };

    let xMolino4: windmill = {
      name: "Molino4",
      id: "4",
      base: base2,
      body: cuerpo1,
      blade: aspa2,
      state: "Pendiente"
    };
    this.windmillsHardcodeados.push(xMolino1);
    this.windmillsHardcodeados.push(xMolino2);
    this.windmillsHardcodeados.push(xMolino3);
    this.windmillsHardcodeados.push(xMolino4);
  }
}

