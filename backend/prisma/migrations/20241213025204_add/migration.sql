/*
  Warnings:

  - You are about to drop the column `id_item` on the `itens_pedido` table. All the data in the column will be lost.
  - You are about to drop the column `id_restaurante` on the `pedidos` table. All the data in the column will be lost.
  - Added the required column `id_item_cardapio` to the `itens_pedido` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_item_cardapio` to the `pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "itens_pedido" DROP CONSTRAINT "itens_pedido_id_item_fkey";

-- DropForeignKey
ALTER TABLE "pedidos" DROP CONSTRAINT "pedidos_id_restaurante_fkey";

-- AlterTable
ALTER TABLE "itens_pedido" DROP COLUMN "id_item",
ADD COLUMN     "id_item_cardapio" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "pedidos" DROP COLUMN "id_restaurante",
ADD COLUMN     "id_item_cardapio" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "pedidos" ADD CONSTRAINT "pedidos_id_item_cardapio_fkey" FOREIGN KEY ("id_item_cardapio") REFERENCES "restaurantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_id_item_cardapio_fkey" FOREIGN KEY ("id_item_cardapio") REFERENCES "itens_cardapio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
