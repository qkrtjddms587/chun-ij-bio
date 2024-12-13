/*
  Warnings:

  - You are about to drop the column `created_at` on the `Material` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `Material` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Material` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `NonTask` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN "deletedAt" DATETIME;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN "deletedAt" DATETIME;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Material" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "classification1" TEXT NOT NULL,
    "classification2" TEXT NOT NULL,
    "classification3" TEXT,
    "unit" TEXT NOT NULL,
    "etc" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "productId" INTEGER,
    CONSTRAINT "Material_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Material" ("classification1", "classification2", "classification3", "code", "etc", "id", "name", "productId", "unit") SELECT "classification1", "classification2", "classification3", "code", "etc", "id", "name", "productId", "unit" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE UNIQUE INDEX "Material_code_key" ON "Material"("code");
CREATE TABLE "new_NonTask" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "reason1" TEXT NOT NULL,
    "reason2" TEXT NOT NULL,
    "line" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_NonTask" ("endTime", "id", "line", "reason1", "reason2", "startTime") SELECT "endTime", "id", "line", "reason1", "reason2", "startTime" FROM "NonTask";
DROP TABLE "NonTask";
ALTER TABLE "new_NonTask" RENAME TO "NonTask";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
