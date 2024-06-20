/*
  Warnings:

  - Added the required column `item_id` to the `Items_img` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Items_img" ADD COLUMN     "item_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Items_img" ADD CONSTRAINT "Items_img_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
