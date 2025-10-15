import { NextResponse } from "next/server";
import {
  getAllDishesinfo,
  getAllDishesinfobyid,
} from "../../../lib/Services/category-service";
export async function GET() {
  const categories = await getAllDishesinfo();
  return new NextResponse(JSON.stringify({ data: categories }), {
    status: 200,
  });
}

export async function POST(req: NextResponse) {
  const body = await req.json();

  const Dishes = await getAllDishesinfobyid(body._id);
  console.log("fdbdfbdf", body._id);
  console.log({ Dishes });
  return new NextResponse(JSON.stringify({ data: Dishes }), {
    status: 200,
  });
}
