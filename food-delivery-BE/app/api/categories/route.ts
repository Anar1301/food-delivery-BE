import { NextRequest, NextResponse } from "next/server";
import {
  createCategory,
  getAllCategories,
} from "../../../lib/Services/category-service";
import { request } from "http";

export async function GET() {
  const categories = await getAllCategories();
  console.log(categories, "sdhjlashdjlsa ajillaa");
  return new NextResponse(JSON.stringify({ data: categories }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log(body);
  await createCategory(body.name);
  return new NextResponse(JSON.stringify({ message: "Category created" }), {
    status: 200,
  });
}
