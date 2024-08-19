/*
  Warnings:

  - Added the required column `currency` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromAccountId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAddress` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_accountId_fkey";

-- AlterTable
ALTER TABLE "TransactionHistory" ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "fromAccountId" TEXT NOT NULL,
ADD COLUMN     "toAddress" TEXT NOT NULL,
ALTER COLUMN "accountId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;
