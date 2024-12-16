/*
  Warnings:

  - You are about to drop the column `isCompleted` on the `SemiProduct` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SemiProduct" (
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
    "deletedAt" DATETIME
);
INSERT INTO "new_SemiProduct" ("classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "oem", "standard", "unit", "updatedAt") SELECT "classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "oem", "standard", "unit", "updatedAt" FROM "SemiProduct";
DROP TABLE "SemiProduct";
ALTER TABLE "new_SemiProduct" RENAME TO "SemiProduct";
CREATE UNIQUE INDEX "SemiProduct_code_key" ON "SemiProduct"("code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
