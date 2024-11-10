-- DropForeignKey
ALTER TABLE `produto_ordem_servico` DROP FOREIGN KEY `produto_ordem_servico_produtoId_fkey`;

-- AddForeignKey
ALTER TABLE `produto_ordem_servico` ADD CONSTRAINT `produto_ordem_servico_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `Estoque`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
