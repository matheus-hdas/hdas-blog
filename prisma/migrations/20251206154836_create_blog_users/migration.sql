/*
  Warnings:

  - You are about to drop the column `deletedAt` on the `blogs` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `deletedAt`,
    ADD COLUMN `deleted_at` DATETIME(3) NULL;

-- CreateTable
CREATE TABLE `blog_users` (
    `id` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'AUTHOR', 'ADMIN', 'EDITOR') NOT NULL DEFAULT 'AUTHOR',
    `blog_id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `blog_users` ADD CONSTRAINT `blog_users_blog_id_fkey` FOREIGN KEY (`blog_id`) REFERENCES `blogs`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `blog_users` ADD CONSTRAINT `blog_users_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
