/*
  Warnings:

  - You are about to drop the column `toAccountId` on the `TransactionHistory` table. All the data in the column will be lost.
  - Added the required column `toAddress` to the `TransactionHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "toAccountId",
ADD COLUMN     "toAddress" TEXT NOT NULL;
