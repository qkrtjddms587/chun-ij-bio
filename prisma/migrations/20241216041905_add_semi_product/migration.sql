/*
  Warnings:

  - You are about to drop the column `semiProductName` on the `Product` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "SemiProduct" (
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
    "isCompleted" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME
);

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
    "semiProductId" INTEGER,
    CONSTRAINT "Material_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Material_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Material" ("classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "productId", "unit", "updatedAt") SELECT "classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "name", "productId", "unit", "updatedAt" FROM "Material";
DROP TABLE "Material";
ALTER TABLE "new_Material" RENAME TO "Material";
CREATE UNIQUE INDEX "Material_code_key" ON "Material"("code");
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
    "isCompleted" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "semiProductId" INTEGER,
    CONSTRAINT "Product_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "isCompleted", "name", "oem", "standard", "unit", "updatedAt") SELECT "classification1", "classification2", "classification3", "code", "createdAt", "deletedAt", "etc", "id", "isCompleted", "name", "oem", "standard", "unit", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_code_key" ON "Product"("code");
CREATE TABLE "new_ProductStock" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "materialId" INTEGER,
    "recipeId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "semiProductId" INTEGER,
    CONSTRAINT "ProductStock_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductStock_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "Material" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "ProductStock_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ProductStock_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_ProductStock" ("id", "materialId", "productId", "quantity", "recipeId") SELECT "id", "materialId", "productId", "quantity", "recipeId" FROM "ProductStock";
DROP TABLE "ProductStock";
ALTER TABLE "new_ProductStock" RENAME TO "ProductStock";
CREATE TABLE "new_Recipe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "etc" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "productId" INTEGER NOT NULL,
    "semiProductId" INTEGER,
    CONSTRAINT "Recipe_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Recipe_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Recipe" ("createdAt", "deletedAt", "etc", "id", "name", "productId", "updatedAt") SELECT "createdAt", "deletedAt", "etc", "id", "name", "productId", "updatedAt" FROM "Recipe";
DROP TABLE "Recipe";
ALTER TABLE "new_Recipe" RENAME TO "Recipe";
CREATE TABLE "new_Task" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "planQuantity" INTEGER NOT NULL,
    "resultQuantity" INTEGER NOT NULL,
    "line" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "staff" TEXT NOT NULL,
    "planStartTime" DATETIME NOT NULL,
    "planEndTime" DATETIME NOT NULL,
    "resultStartTime" DATETIME,
    "resultEndTime" DATETIME,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "deletedAt" DATETIME,
    "semiProductId" INTEGER,
    CONSTRAINT "Task_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Task_semiProductId_fkey" FOREIGN KEY ("semiProductId") REFERENCES "SemiProduct" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Task" ("createdAt", "deletedAt", "id", "line", "manager", "planEndTime", "planQuantity", "planStartTime", "productId", "recipeId", "resultEndTime", "resultQuantity", "resultStartTime", "staff", "status", "updatedAt") SELECT "createdAt", "deletedAt", "id", "line", "manager", "planEndTime", "planQuantity", "planStartTime", "productId", "recipeId", "resultEndTime", "resultQuantity", "resultStartTime", "staff", "status", "updatedAt" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "SemiProduct_code_key" ON "SemiProduct"("code");
