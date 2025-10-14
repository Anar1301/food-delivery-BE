import { Schema } from "mongoose";

export type FoodType = {
  categorid: string;

  name: string;
  ingredients: string;
  image: string;
  price: number;
  category: string;
};
