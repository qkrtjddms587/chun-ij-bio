/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `Product` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,
    "etc" TEXT,
    "classification1" TEXT NOT NULL,
    "classification2" TEXT NOT NULL,
    "classification3" TEXT,
    "standard" INTEGER NOT NULL,
    "oem" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "semiProductId" INTEGER,
    CONSTRAINT "Product_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "oem", "semiProductId", "standard", "unit", "updatedAt") SELECT "classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "oem", "semiProductId", "standard", "unit", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
