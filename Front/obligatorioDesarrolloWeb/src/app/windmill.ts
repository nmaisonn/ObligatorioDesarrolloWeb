import { windmillPart } from "./windmillPart";

export interface windmill {
    name: String;
    id: String;
    base: windmillPart;
    body: windmillPart;
    blade: windmillPart;
    state: String;
}