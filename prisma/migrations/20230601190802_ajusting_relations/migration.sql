/*
  Warnings:

  - A unique constraint covering the columns `[subjectId,userId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `subjectId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Task_subjectId_userId_key` ON `Task`(`subjectId`, `userId`);

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_subjectId_fkey` FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
