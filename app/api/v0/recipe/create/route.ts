import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RecipeSchema } from "../../(z-schema)/recipe";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validatedData = await RecipeSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json(
      { success: false, message: validatedData.error },
      { status: 400 }
    );

  const { name, productId, materials, etc } = validatedData.data;

  const newRecipe = await db.recipe.create({
    data: {
      name,
      productId,
      etc,
      materials: {
        create:
          materials?.map((material) => ({
            materialId: material.materialId,
            ratio: material.ratio,
          })) || [],
      },
    },
  });
  if (!newRecipe) return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
