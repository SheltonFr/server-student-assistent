/*
  Warnings:

  - A unique constraint covering the columns `[subjectId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Task` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Task_subjectId_key` ON `Task`(`subjectId`);

-- CreateIndex
CREATE UNIQUE INDEX `Task_userId_key` ON `Task`(`userId`);
