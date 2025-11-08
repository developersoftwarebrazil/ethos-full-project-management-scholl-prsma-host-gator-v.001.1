/*
  Warnings:

  - Added the required column `description` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "_SubjectToTeacher" ADD CONSTRAINT "_SubjectToTeacher_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_SubjectToTeacher_AB_unique";
