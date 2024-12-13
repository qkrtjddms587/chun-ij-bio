/*
  Warnings:

  - Added the required column `updatedAt` to the `MaterialStock` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MaterialStock" (
    "materialId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MaterialStock_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_MaterialStock" ("materialId", "quantity") SELECT "materialId", "quantity" FROM "MaterialStock";
DROP TABLE "MaterialStock";
ALTER TABLE "new_MaterialStock" RENAME TO "MaterialStock";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
