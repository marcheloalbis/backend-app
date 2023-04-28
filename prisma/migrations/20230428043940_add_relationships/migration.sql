-- DropIndex
DROP INDEX `Subscription_planId_fkey` ON `subscription`;

-- DropIndex
DROP INDEX `User_subscriptionId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` MODIFY `subscriptionId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_subscriptionId_fkey` FOREIGN KEY (`subscriptionId`) REFERENCES `Subscription`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
