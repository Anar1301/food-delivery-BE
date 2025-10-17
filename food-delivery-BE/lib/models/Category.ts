import mongoose, { Schema } from "mongoose";

type CategorySchemaType = {
  name: string;
  id: any;
};
export type FoodsSchemaType = {
  name: string;
  ingredients: string;
  price: number;
  category: string;
  image: string;
  categorid: string;
};

const CategorySchema = new Schema({
  name: String,
});
export const Category =
  mongoose.models.Category ||
  mongoose.model<CategorySchemaType>("Category", CategorySchema);
