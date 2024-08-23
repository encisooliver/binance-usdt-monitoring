-- CreateTable
CREATE TABLE `Incomes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `receiver_wallet_address` VARCHAR(191) NOT NULL,
    `particulars` VARCHAR(191) NOT NULL,
    `usdt_amount` VARCHAR(191) NOT NULL,
    `mshl_amount` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
