-- AlterTable
ALTER TABLE `serviceorder` MODIFY `status` ENUM('PENDENTE', 'CONFIRMED', 'CANCELED') NOT NULL;
