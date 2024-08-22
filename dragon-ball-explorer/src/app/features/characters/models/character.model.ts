import { Planet } from "../../planets/models/planet.model";
import { Transformation } from "./transformation.model";

export interface Character{
    id: number;
    name: string;
    ki: string;
    maxKi: string;
    race: string;
    gender: string;
    description: string;
    image: string;
    affiliation: string;
    originPlanet?: Planet;
    transformations?: Transformation[];
}