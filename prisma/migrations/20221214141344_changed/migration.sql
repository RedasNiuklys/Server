/*
  Warnings:

  - You are about to drop the column `EndTime` on the `route` table. All the data in the column will be lost.
  - You are about to drop the column `Late` on the `route` table. All the data in the column will be lost.
  - You are about to drop the column `LateBy` on the `route` table. All the data in the column will be lost.
  - You are about to drop the column `StartTime` on the `route` table. All the data in the column will be lost.
  - Added the required column `EndTime` to the `bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Late` to the `bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `StartTime` to the `bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bus` ADD COLUMN `EndTime` TIME(0) NOT NULL,
    ADD COLUMN `Late` BOOLEAN NOT NULL,
    ADD COLUMN `LateBy` TIME(0) NULL,
    ADD COLUMN `StartTime` TIME(0) NOT NULL;

-- AlterTable
ALTER TABLE `route` DROP COLUMN `EndTime`,
    DROP COLUMN `Late`,
    DROP COLUMN `LateBy`,
    DROP COLUMN `StartTime`;

-- AlterTable
ALTER TABLE `user` MODIFY `Password` VARCHAR(64) NOT NULL;
