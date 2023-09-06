/*
  Warnings:

  - You are about to drop the column `businessName` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Customer` table. All the data in the column will be lost.
  - Added the required column `name` to the `Account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Customer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "verificationToken" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "businessName",
ALTER COLUMN "contact" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN     "phone" TEXT NOT NULL;
