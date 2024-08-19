/*
  Warnings:

  - You are about to drop the column `toAddress` on the `TransactionHistory` table. All the data in the column will be lost.
  - Added the required column `toAccountId` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "toAddress",
ADD COLUMN     "toAccountId" TEXT NOT NULL;
