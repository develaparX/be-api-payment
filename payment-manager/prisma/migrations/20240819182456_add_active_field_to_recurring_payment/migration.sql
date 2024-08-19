/*
  Warnings:

  - Added the required column `toAccountId` to the `RecurringPayment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RecurringPayment" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastPaymentDate" TIMESTAMP(3),
ADD COLUMN     "toAccountId" TEXT NOT NULL;
