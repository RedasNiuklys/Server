/*
  Warnings:

  - You are about to drop the column `IsAdmin` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `IsAdmin`,
    ADD COLUMN `AccessLevel` INTEGER NOT NULL DEFAULT 1;
