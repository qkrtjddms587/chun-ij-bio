import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ProductSchema } from "../../(z-schema)/product";

/*
  code String @unique
  name String

  recipes   Recipe[]
  materials Material[]

  unit            String
  etc             String?
  classification1 String
  classification2 String
  classification3 String?
  standard        Int
  oem             String?
  isCompleted     Boolean

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  semiProductName String?
  Task            Task[]

  ProductStock ProductStock[]
*/

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = await ProductSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json(
      { success: false, message: validatedData.error },
      { status: 400 }
    );
  const exist = await db.product.findUnique({
    where: {
      code: validatedData.data!.code,
    },
    select: {
      id: true,
    },
  });
  if (exist)
    return NextResponse.json(
      { success: false, message: "product is exist" },
      { status: 400 }
    );
  const newProduct = await db.product.create({
    data: {
      ...validatedData.data,
      materials: { connect: validatedData.data.materials },
    },
    select: { id: true },
  });
  if (!newProduct)
    return NextResponse.json(
      { success: false, message: "product create failed" },
      { status: 400 }
    );
  return NextResponse.json({ success: true }, { status: 200 });
}
