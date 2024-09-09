/*
  Warnings:

  - You are about to drop the column `items` on the `orders` table. All the data in the column will be lost.
  - Added the required column `id_fornecedor` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "items",
ADD COLUMN     "id_fornecedor" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "orders_items" (
    "id" TEXT NOT NULL,
    "id_pedido" TEXT NOT NULL,
    "id_produto" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "qtd" INTEGER NOT NULL,

    CONSTRAINT "orders_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_id_fornecedor_fkey" FOREIGN KEY ("id_fornecedor") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_id_pedido_fkey" FOREIGN KEY ("id_pedido") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_id_produto_fkey" FOREIGN KEY ("id_produto") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
