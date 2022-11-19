import { windmillPart } from "./windmillPart";

export interface windmill {
    name: String;
    id: String;
    piezas:windmillPart[];
    state: String;
}