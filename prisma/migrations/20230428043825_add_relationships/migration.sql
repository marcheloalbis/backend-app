/*
  Warnings:

  - You are about to drop the column `endDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `subscription` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - Added the required column `name` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Subscription` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Subscription_planId_fkey` ON `subscription`;

-- DropIndex
DROP INDEX `Subscription_userId_fkey` ON `subscription`;

-- AlterTable
ALTER TABLE `plan` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `subscription` DROP COLUMN `endDate`,
    DROP COLUMN `isActive`,
    DROP COLUMN `paymentMethod`,
    DROP COLUMN `startDate`,
    DROP COLUMN `userId`,
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `role`,
    ADD COLUMN `subscriptionId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
