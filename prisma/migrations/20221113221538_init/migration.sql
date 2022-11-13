-- CreateTable
CREATE TABLE `bus` (
    `VIN` VARCHAR(18) NOT NULL,
    `routeId` INTEGER NULL,
    `NumberPlate` VARCHAR(15) NOT NULL,
    `Tech.Inspection` DATE NOT NULL,
    `Mileage` INTEGER NOT NULL,
    `StandingSpaces` INTEGER NOT NULL DEFAULT 0,
    `SittingSpaces` INTEGER NOT NULL,
    `WC` BOOLEAN NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `routeReference`(`routeId`),
    PRIMARY KEY (`VIN`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `park` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `workHours` JSON NOT NULL,
    `City` VARCHAR(50) NOT NULL,
    `Street` VARCHAR(50) NOT NULL,
    `Number` VARCHAR(6) NOT NULL,
    `routesNumber` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `route` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `parkId` INTEGER NOT NULL,
    `Stops` TEXT NOT NULL,
    `StartTime` TIME(0) NOT NULL,
    `EndTime` TIME(0) NOT NULL,
    `Late` BOOLEAN NOT NULL,
    `LateBy` TIME(0) NULL,
    `International` BOOLEAN NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `parkReference`(`parkId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `likedbusses` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `busId` VARCHAR(18) NOT NULL,

    INDEX `busReference`(`busId`),
    INDEX `userReference`(`userId`),
    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `Id` INTEGER NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(50) NOT NULL,
    `Username` VARCHAR(30) NOT NULL,
    `Password` VARCHAR(32) NOT NULL,
    `IsAdmin` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `modifiedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`Id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `bus` ADD CONSTRAINT `routeReference` FOREIGN KEY (`routeId`) REFERENCES `route`(`Id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `route` ADD CONSTRAINT `parkReference` FOREIGN KEY (`parkId`) REFERENCES `park`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likedbusses` ADD CONSTRAINT `busReference` FOREIGN KEY (`busId`) REFERENCES `bus`(`VIN`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `likedbusses` ADD CONSTRAINT `userReference` FOREIGN KEY (`userId`) REFERENCES `user`(`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
