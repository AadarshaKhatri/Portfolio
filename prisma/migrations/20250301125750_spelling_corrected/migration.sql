/*
  Warnings:

  - You are about to drop the column `imaghes` on the `Languages` table. All the data in the column will be lost.
  - Added the required column `Images` to the `Languages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Languages" DROP COLUMN "imaghes",
ADD COLUMN     "Images" TEXT NOT NULL;
