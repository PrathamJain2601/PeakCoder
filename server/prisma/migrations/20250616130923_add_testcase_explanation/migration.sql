-- AlterEnum
ALTER TYPE "Verdict" ADD VALUE 'MEMORY_LIMIT_EXCEEDED';

-- AlterTable
ALTER TABLE "TestCase" ADD COLUMN     "explanation" TEXT;
