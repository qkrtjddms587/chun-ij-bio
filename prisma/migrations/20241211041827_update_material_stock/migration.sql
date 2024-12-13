/*
  Warnings:

  - The primary key for the `MaterialStock` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MaterialStock` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MaterialStock" (
    "materialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "MaterialStock_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MaterialStock" ("materialId", "quantity") SELECT "materialId", "quantity" FROM "MaterialStock";
DROP TABLE "MaterialStock";
ALTER TABLE "new_MaterialStock" RENAME TO "MaterialStock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
