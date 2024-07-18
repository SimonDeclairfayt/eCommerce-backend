-- DropForeignKey
ALTER TABLE "Items" DROP CONSTRAINT "Items_collection_id_fkey";

-- AlterTable
ALTER TABLE "Items" ALTER COLUMN "collection_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_collection_id_fkey" FOREIGN KEY ("collection_id") REFERENCES "Collections"("id") ON DELETE SET NULL ON UPDATE CASCADE;
