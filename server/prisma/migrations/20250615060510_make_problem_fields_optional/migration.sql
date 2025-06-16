/*
  Warnings:

  - You are about to drop the column `tags` on the `Problem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titleSlug]` on the table `Problem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `titleSlug` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Problem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Submission` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `status` on the `Submission` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Verdict" AS ENUM ('PENDING', 'ACCEPTED', 'WRONG_ANSWER', 'TIME_LIMIT_EXCEEDED', 'RUNTIME_ERROR', 'COMPILATION_ERROR');

-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "tags",
ADD COLUMN     "constraints" TEXT,
ADD COLUMN     "hints" TEXT[],
ADD COLUMN     "titleSlug" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Submission" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "Verdict" NOT NULL;

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProblemTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ProblemTags_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE INDEX "_ProblemTags_B_index" ON "_ProblemTags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Problem_titleSlug_key" ON "Problem"("titleSlug");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_languageId_fkey" FOREIGN KEY ("languageId") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemTags" ADD CONSTRAINT "_ProblemTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Problem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProblemTags" ADD CONSTRAINT "_ProblemTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
