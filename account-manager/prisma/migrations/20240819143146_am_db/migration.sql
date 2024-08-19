/*
  Warnings:

  - Added the required column `toAccountId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "toAccountId" TEXT NOT NULL,
ADD COLUMN     "transactionId" TEXT NOT NULL,
ALTER COLUMN "toAddress" DROP NOT NULL;
