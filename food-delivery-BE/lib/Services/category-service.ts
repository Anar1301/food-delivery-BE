import { Category, FoodsSchemaType } from "../models/Category";
import connectDB from "../mongoose";
import { Food } from "../models/Food";
export const createCategory = async (name: string) => {
  await connectDB();
  const newCategory = new Category({ name });
  await newCategory.save();
  return newCategory;
};

export const getAllCategories = async () => {
  await connectDB();
  return await Category.find();
};

export const CreatFoodsinfo = async (form: FoodsSchemaType) => {
  await connectDB();
  const newFoods = new Food(form);
  await newFoods.save();
  return newFoods;
};
export const getAllFoodsinfo = async () => {
  await connectDB();
  return await Food.find().populate("categoryId");
};
export const deleteCategory = async (id: string) => {
  await connectDB();
  return await Category.findByIdAndDelete(id);
};
export const deletefoodinfo = async (id: string) => {
  await connectDB();
  return await Food.findByIdAndDelete(id);
};
export const getAllFoodsinfobyid = async (id: string) => {
  await connectDB();
  return await Food.findById(id);
};
