/*
  Warnings:

  - A unique constraint covering the columns `[name,userId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[title,userId,subjectId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Subject_name_key` ON `subject`;

-- DropIndex
DROP INDEX `Task_subjectId_userId_key` ON `task`;

-- CreateIndex
CREATE UNIQUE INDEX `Subject_name_userId_key` ON `Subject`(`name`, `userId`);

-- CreateIndex
CREATE UNIQUE INDEX `Task_title_userId_subjectId_key` ON `Task`(`title`, `userId`, `subjectId`);
