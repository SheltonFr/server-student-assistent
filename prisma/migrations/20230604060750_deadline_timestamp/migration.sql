/*
  Warnings:

  - You are about to alter the column `deadline` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `task` MODIFY `deadline` TIMESTAMP NOT NULL;
