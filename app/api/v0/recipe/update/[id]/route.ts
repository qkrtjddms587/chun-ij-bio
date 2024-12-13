import db from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { RecipeSchema } from "../../../(z-schema)/recipe";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const recipeId = parseInt(id);

  const body = await req.json();

  const validatedData = await RecipeSchema.spa(body);
  if (!validatedData.success)
    return NextResponse.json({ success: false }, { status: 400 });

  const { name, productId, materials, etc } = validatedData.data;

  const exist = await db.recipe.findUnique({
    where: {
      id: recipeId,
    },
    select: {
      id: true,
    },
  });
  if (!exist) return NextResponse.json({ success: false }, { status: 400 });

  const updatedRecipe = await db.recipe.update({
    where: { id: recipeId },
    data: {
      name,
      productId,
      etc,
      materials: {
        upsert:
          materials?.map((material) => ({
            where: {
              recipeId_materialId: {
                recipeId: recipeId,
                materialId: material.materialId,
              },
            },
            update: { ratio: material.ratio },
            create: { materialId: material.materialId, ratio: material.ratio },
          })) || [],
      },
    },
    select: { id: true },
  });
  if (!updatedRecipe)
    return NextResponse.json({ success: false }, { status: 400 });
  return NextResponse.json({ success: true }, { status: 200 });
}
