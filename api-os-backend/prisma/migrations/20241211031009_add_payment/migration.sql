-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `valor` DECIMAL(9, 2) NOT NULL,
    `modalidade` ENUM('DINHEIRO', 'DEBITO', 'CREDITO', 'PARCELADO', 'PIX') NOT NULL,
    `ordemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_ordemId_fkey` FOREIGN KEY (`ordemId`) REFERENCES `ServiceOrder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
