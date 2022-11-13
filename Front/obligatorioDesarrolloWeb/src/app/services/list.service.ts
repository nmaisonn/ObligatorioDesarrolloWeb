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
}
