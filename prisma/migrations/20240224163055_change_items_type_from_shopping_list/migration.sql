/*
  Warnings:

  - The `items` column on the `shoppinglists` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "shoppinglists" DROP COLUMN "items",
ADD COLUMN     "items" TEXT[];
