import mongoose, { Schema } from "mongoose";
export type DishesSchemaType = {
  name: string;
  ingredients: string;
  price: number;
  category: string;
  image: string;
  categorid: string;
};

const Dishesinfo = new Schema({
  categorid: Schema.Types.ObjectId,
  name: String,
  ingredients: String,
  price: Number,
  category: String,
  image: String,
});

export const Dishes =
  mongoose.models.Dishes ||
  mongoose.model<DishesSchemaType>("Dishes", Dishesinfo);
