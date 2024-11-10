-- DropForeignKey
ALTER TABLE `estoque` DROP FOREIGN KEY `Estoque_ordemId_fkey`;

-- AlterTable
ALTER TABLE `estoque` MODIFY `ordemId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Estoque` ADD CONSTRAINT `Estoque_ordemId_fkey` FOREIGN KEY (`ordemId`) REFERENCES `ServiceOrder`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
