import { Category, Dishes, DishesSchemaType } from "../models/Category";
import connectDB from "../mongoose";

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

export const CreatDishesinfo = async (form: DishesSchemaType) => {
  await connectDB();
  const newDishes = new Dishes(form);
  await newDishes.save();
  return newDishes;
};
export const getAllDishesinfo = async (id: string) => {
  await connectDB();
  return await Dishes.findById(id);
};
export const deleteCategory = async (id: string) => {
  await connectDB();
  return await Category.findByIdAndDelete(id);
};
export const deletefoodinfo = async (id: string) => {
  await connectDB();
  return await Dishes.findByIdAndDelete(id);
};
