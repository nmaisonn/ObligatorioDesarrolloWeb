import { WindmillPart } from "./windmill-part";

export interface Windmill {
    name: String;
    id: String;
    base: WindmillPart;
    body: WindmillPart;
    blade: WindmillPart;
    state: String;
}
