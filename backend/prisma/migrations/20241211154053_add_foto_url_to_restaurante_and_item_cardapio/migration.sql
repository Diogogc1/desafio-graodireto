/*
  Warnings:

  - Added the required column `fotoUrl` to the `itens_cardapio` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fotoUrl` to the `restaurantes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "itens_cardapio" ADD COLUMN     "fotoUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "restaurantes" ADD COLUMN     "fotoUrl" TEXT NOT NULL;
