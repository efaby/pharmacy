import {Ingredient} from "./../models/ingredient";
export class Medicine {
  id: string;
  name: string;
  posology: string;
  expire: string;
  ingredients: Ingredient[];
}
