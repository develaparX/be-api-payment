/*
  Warnings:

  - Added the required column `userId` to the `RecurringPayment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecurringPayment" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "userId" TEXT NOT NULL;
