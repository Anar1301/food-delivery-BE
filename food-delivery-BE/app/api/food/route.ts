import { NextRequest, NextResponse } from "next/server";

import { FoodType } from "../../../lib/utils/types";
import { uploadImageToCloudinary } from "../../../lib/utils/uploadimage";
import {
  CreatFoodsinfo,
  getAllFoodsinfo,
} from "../../../lib/Services/category-service";

export async function GET() {
  const Foods = await getAllFoodsinfo();

  return new NextResponse(JSON.stringify({ data: Foods }), {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;

    const image = formData.get("image") as File;
    console.log({ image });
    const categorid = formData.get("categorid") as string;

    if (!name || !ingredients || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let imageUrl = "";
    if (image instanceof File) {
      imageUrl = await uploadImageToCloudinary(image);
    } else if (typeof image === "string") {
      imageUrl = image;
    }
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    const foodData: FoodType = {
      categorid,
      name,
      ingredients,
      price: parseFloat(price),
      image: imageUrl,
      category: categorid,
    };

    await CreatFoodsinfo(foodData);

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
