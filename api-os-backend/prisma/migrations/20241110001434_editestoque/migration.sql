/*
  Warnings:

  - You are about to drop the `operador_ordem_servico` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `operador_ordem_servico` DROP FOREIGN KEY `operador_ordem_servico_ordemServicoId_fkey`;

-- DropForeignKey
ALTER TABLE `operador_ordem_servico` DROP FOREIGN KEY `operador_ordem_servico_userId_fkey`;

-- DropTable
DROP TABLE `operador_ordem_servico`;

-- CreateTable
CREATE TABLE `_operatorOrdemSerice` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_operatorOrdemSerice_AB_unique`(`A`, `B`),
    INDEX `_operatorOrdemSerice_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_operatorOrdemSerice` ADD CONSTRAINT `_operatorOrdemSerice_A_fkey` FOREIGN KEY (`A`) REFERENCES `ServiceOrder`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_operatorOrdemSerice` ADD CONSTRAINT `_operatorOrdemSerice_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
