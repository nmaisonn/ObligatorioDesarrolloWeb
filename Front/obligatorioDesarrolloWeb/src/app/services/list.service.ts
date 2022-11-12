import { Injectable } from '@angular/core';
import { windmillPart } from '../windmillPart';
import { PARTES } from '../partes';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor() { }

  getWindmillParts(): windmillPart[] {
    return PARTES;
  }
  addWindmillPart(part: windmillPart) {
    PARTES.push(part);
  }

  deleteWindmillPart(part: windmillPart) {
    let index = PARTES.findIndex(d => d.name === part.name); //find index in your array
    PARTES.splice(index, 1);//remove element from array

  }

  editWindmillPart(part: windmillPart) {
    console.log(part)
  }
}
