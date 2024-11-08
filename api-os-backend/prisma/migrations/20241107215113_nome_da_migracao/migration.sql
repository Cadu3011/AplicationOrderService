/*
  Warnings:

  - You are about to drop the column `userId` on the `serviceorder` table. All the data in the column will be lost.
  - You are about to drop the `orderproduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `stockmovement` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_productId_fkey`;

-- DropForeignKey
ALTER TABLE `orderproduct` DROP FOREIGN KEY `OrderProduct_serviceOrderId_fkey`;

-- DropForeignKey
ALTER TABLE `serviceorder` DROP FOREIGN KEY `ServiceOrder_userId_fkey`;

-- DropForeignKey
ALTER TABLE `stockmovement` DROP FOREIGN KEY `StockMovement_productId_fkey`;

-- DropForeignKey
ALTER TABLE `stockmovement` DROP FOREIGN KEY `StockMovement_userId_fkey`;

-- AlterTable
ALTER TABLE `serviceorder` DROP COLUMN `userId`;

-- DropTable
DROP TABLE `orderproduct`;

-- DropTable
DROP TABLE `stockmovement`;

-- CreateTable
CREATE TABLE `Estoque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantidade` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,

    UNIQUE INDEX `Estoque_produtoId_key`(`produtoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `operador_ordem_servico` (
    `userId` INTEGER NOT NULL,
    `ordemServicoId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `ordemServicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `produto_ordem_servico` (
    `produtoId` INTEGER NOT NULL,
    `ordemServicoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,

    PRIMARY KEY (`produtoId`, `ordemServicoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operador_ordem_servico` ADD CONSTRAINT `operador_ordem_servico_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `operador_ordem_servico` ADD CONSTRAINT `operador_ordem_servico_ordemServicoId_fkey` FOREIGN KEY (`ordemServicoId`) REFERENCES `ServiceOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto_ordem_servico` ADD CONSTRAINT `produto_ordem_servico_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `produto_ordem_servico` ADD CONSTRAINT `produto_ordem_servico_ordemServicoId_fkey` FOREIGN KEY (`ordemServicoId`) REFERENCES `ServiceOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
