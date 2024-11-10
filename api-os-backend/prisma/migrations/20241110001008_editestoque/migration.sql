/*
  Warnings:

  - You are about to drop the `produto_ordem_servico` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ordemId` to the `Estoque` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `produto_ordem_servico` DROP FOREIGN KEY `produto_ordem_servico_ordemServicoId_fkey`;

-- DropForeignKey
ALTER TABLE `produto_ordem_servico` DROP FOREIGN KEY `produto_ordem_servico_produtoId_fkey`;

-- AlterTable
ALTER TABLE `estoque` ADD COLUMN `ordemId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `produto_ordem_servico`;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_ordemId_fkey` FOREIGN KEY (`ordemId`) REFERENCES `ServiceOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
