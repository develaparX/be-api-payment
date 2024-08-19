/*
  Warnings:

  - You are about to drop the column `toAccountId` on the `TransactionHistory` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `TransactionHistory` table. All the data in the column will be lost.
  - Made the column `toAddress` on table `TransactionHistory` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "toAccountId",
DROP COLUMN "transactionId",
ALTER COLUMN "toAddress" SET NOT NULL;
