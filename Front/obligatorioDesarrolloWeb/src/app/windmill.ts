import { windmillPart } from "./windmillPart";

export interface windmill {
    id: String;
    base: windmillPart;
    body: windmillPart;
    blade: windmillPart;
    state: String;
}