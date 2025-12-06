-- CreateTable
CREATE TABLE `blogs` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(60) NOT NULL,
    `subtitle` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(60) NOT NULL,
    `bg_color` VARCHAR(60) NOT NULL DEFAULT '#FFFFFF',
    `text_color` VARCHAR(60) NOT NULL DEFAULT '#000000',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    UNIQUE INDEX `blogs_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
