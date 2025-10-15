import { NextRequest, NextResponse } from "next/server";

import { FoodType } from "../../../lib/utils/types";
import { uploadImageToCloudinary } from "../../../lib/utils/uploadimage";
import {
  CreatDishesinfo,
  getAllDishesinfo,
} from "../../../lib/Services/category-service";
import { Schema } from "mongoose";

export async function GET() {
  const Dishes = await getAllDishesinfo();

  return new NextResponse(JSON.stringify({ data: Dishes }), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  type categorid = {
    type: Schema.Types.ObjectId;
  };
  try {
    // Parse the formData from the request
    const formData = await request.formData();

    // Extract food fields from formData
    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;
    const categorid = formData.get("categorid") as string;
    // Console log the received data
    console.log("========== Received Food Data ==========");
    console.log("Name:", name);
    console.log("ingredients:", ingredients);
    console.log("Price:", price);
    // console.log("Category:", category);
    console.log(
      "Image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("=======================================");

    // Validate required fields
    if (!name || !ingredients || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Handle image upload if image exists
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Prepare the food data object
    const foodData: FoodType = {
      categorid,
      name,
      ingredients,
      price: parseFloat(price),
      category,
      image: imageUrl,
    };

    console.log("Final Food Data:", foodData);
    await CreatDishesinfo(foodData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Food item received and image uploaded successfully",
        data: foodData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing food data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 501 }
    );
  }
}
