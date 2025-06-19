/*
  Warnings:

  - A unique constraint covering the columns `[extension]` on the table `Language` will be added. If there are existing duplicate values, this will fail.
  - Made the column `judge0Id` on table `Language` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Language" ALTER COLUMN "judge0Id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Language_extension_key" ON "Language"("extension");
