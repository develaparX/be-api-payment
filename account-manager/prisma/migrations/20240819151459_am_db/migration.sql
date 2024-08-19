/*
  Warnings:

  - You are about to drop the column `accountId` on the `TransactionHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TransactionHistory" DROP CONSTRAINT "TransactionHistory_accountId_fkey";

-- AlterTable
ALTER TABLE "TransactionHistory" DROP COLUMN "accountId";

-- AddForeignKey
ALTER TABLE "TransactionHistory" ADD CONSTRAINT "TransactionHistory_fromAccountId_fkey" FOREIGN KEY ("fromAccountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
