/*
  Warnings:

  - The values [Great,Satisfied] on the enum `Remarks` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `contact` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Business` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `productImage` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `OrderItem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `promotionProduct` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to drop the column `business` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `repliedAt` on the `Reply` table. All the data in the column will be lost.
  - You are about to drop the column `reviewedAt` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `promotion` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `promotionDiscount` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `auxillaryColor` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `brandColor` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `brandImage` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `fontstyle` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `hasAboutPage` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `hasContactPage` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColor` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `storeStory` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeColor` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeText` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `welcomebtnText` on the `Temp` table. All the data in the column will be lost.
  - You are about to drop the column `auxillaryColor` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `brandColor` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `brandImage` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `fontstyle` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `hasAboutPage` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `hasContactPage` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `primaryColor` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryColor` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `storeStory` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeColor` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `welcomeText` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the column `welcomebtnText` on the `Template` table. All the data in the column will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reasons` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Team` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `from` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Made the column `comment` on table `Reply` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `order` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Made the column `currency` on table `Store` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `options` to the `Temp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `options` to the `Template` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Pending_Payment', 'Delivered', 'On_Hold', 'Refunded', 'Returned', 'Cancelled', 'Shipped', 'Processing', 'Completed', 'Failed');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('Card', 'Paypal');

-- AlterEnum
BEGIN;
CREATE TYPE "Remarks_new" AS ENUM ('Disappointing', 'Outstanding', 'Satisfactory');
ALTER TABLE "Review" ALTER COLUMN "remarks" TYPE "Remarks_new" USING ("remarks"::text::"Remarks_new");
ALTER TYPE "Remarks" RENAME TO "Remarks_old";
ALTER TYPE "Remarks_new" RENAME TO "Remarks";
DROP TYPE "Remarks_old";
COMMIT;

-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'Admin';

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_customer_fkey";

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_product_fkey";

-- DropForeignKey
ALTER TABLE "Reasons" DROP CONSTRAINT "Reasons_temp_fkey";

-- DropForeignKey
ALTER TABLE "Reasons" DROP CONSTRAINT "Reasons_template_fkey";

-- DropForeignKey
ALTER TABLE "Reply" DROP CONSTRAINT "Reply_business_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_temp_fkey";

-- DropForeignKey
ALTER TABLE "Team" DROP CONSTRAINT "Team_template_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "contact",
DROP COLUMN "location";

-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "picture";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "currency" TEXT NOT NULL,
ADD COLUMN     "destination" TEXT NOT NULL,
ADD COLUMN     "orderId" TEXT NOT NULL,
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "referenceId" TEXT NOT NULL,
ADD COLUMN     "shipping" TEXT NOT NULL,
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'Pending_Payment';

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "productImage",
DROP COLUMN "productName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "order" TEXT NOT NULL,
ADD COLUMN     "total" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "promotionProduct",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "promotion" TEXT,
ALTER COLUMN "price" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Reply" DROP COLUMN "business",
DROP COLUMN "repliedAt",
ADD COLUMN     "from" "Type" NOT NULL,
ADD COLUMN     "store" TEXT,
ALTER COLUMN "comment" SET NOT NULL,
ALTER COLUMN "customer" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "reviewedAt",
ADD COLUMN     "order" TEXT NOT NULL,
ADD COLUMN     "store" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "promotion",
DROP COLUMN "promotionDiscount",
ALTER COLUMN "currency" SET NOT NULL,
ALTER COLUMN "currency" SET DEFAULT 'USD';

-- AlterTable
ALTER TABLE "Temp" DROP COLUMN "auxillaryColor",
DROP COLUMN "brandColor",
DROP COLUMN "brandImage",
DROP COLUMN "fontstyle",
DROP COLUMN "hasAboutPage",
DROP COLUMN "hasContactPage",
DROP COLUMN "name",
DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor",
DROP COLUMN "storeStory",
DROP COLUMN "welcomeColor",
DROP COLUMN "welcomeText",
DROP COLUMN "welcomebtnText",
ADD COLUMN     "options" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "auxillaryColor",
DROP COLUMN "brandColor",
DROP COLUMN "brandImage",
DROP COLUMN "fontstyle",
DROP COLUMN "hasAboutPage",
DROP COLUMN "hasContactPage",
DROP COLUMN "name",
DROP COLUMN "primaryColor",
DROP COLUMN "secondaryColor",
DROP COLUMN "storeStory",
DROP COLUMN "welcomeColor",
DROP COLUMN "welcomeText",
DROP COLUMN "welcomebtnText",
ADD COLUMN     "options" TEXT NOT NULL;

-- DropTable
DROP TABLE "Payment";

-- DropTable
DROP TABLE "Reasons";

-- DropTable
DROP TABLE "Team";

-- CreateTable
CREATE TABLE "Currency" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipping" (
    "id" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "apartmentNo" TEXT NOT NULL DEFAULT 'N/A',
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "customer" TEXT NOT NULL,

    CONSTRAINT "Shipping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessAddress" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "streetAddress" TEXT NOT NULL,
    "appartmentNo" TEXT NOT NULL DEFAULT 'N/A',
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "business" TEXT NOT NULL,

    CONSTRAINT "BusinessAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "statement" TEXT NOT NULL DEFAULT 'Special offers and great deals',
    "discount" INTEGER NOT NULL DEFAULT 0,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "store" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingDestination" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "cost" INTEGER NOT NULL,
    "store" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShippingDestination_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "store" TEXT NOT NULL,

    CONSTRAINT "SiteImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedItem" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "customer" TEXT NOT NULL,
    "liked" BOOLEAN NOT NULL DEFAULT false,
    "store" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SavedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wallet" (
    "id" TEXT NOT NULL,
    "method" "Method" NOT NULL,
    "walletId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "secret" TEXT NOT NULL DEFAULT 'not required',
    "store" TEXT,
    "customer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Wallet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL,
    "commission" DOUBLE PRECISION NOT NULL,
    "payoutId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "store" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_variationsOrdered" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Payout_order_key" ON "Payout"("order");

-- CreateIndex
CREATE UNIQUE INDEX "_variationsOrdered_AB_unique" ON "_variationsOrdered"("A", "B");

-- CreateIndex
CREATE INDEX "_variationsOrdered_B_index" ON "_variationsOrdered"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- AddForeignKey
ALTER TABLE "Shipping" ADD CONSTRAINT "Shipping_customer_fkey" FOREIGN KEY ("customer") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessAddress" ADD CONSTRAINT "BusinessAddress_business_fkey" FOREIGN KEY ("business") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShippingDestination" ADD CONSTRAINT "ShippingDestination_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteImage" ADD CONSTRAINT "SiteImage_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_promotion_fkey" FOREIGN KEY ("promotion") REFERENCES "Promotion"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_fkey" FOREIGN KEY ("customer") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shipping_fkey" FOREIGN KEY ("shipping") REFERENCES "Shipping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_destination_fkey" FOREIGN KEY ("destination") REFERENCES "ShippingDestination"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_customer_fkey" FOREIGN KEY ("customer") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedItem" ADD CONSTRAINT "SavedItem_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wallet" ADD CONSTRAINT "Wallet_customer_fkey" FOREIGN KEY ("customer") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_store_fkey" FOREIGN KEY ("store") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_variationsOrdered" ADD CONSTRAINT "_variationsOrdered_A_fkey" FOREIGN KEY ("A") REFERENCES "OrderItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_variationsOrdered" ADD CONSTRAINT "_variationsOrdered_B_fkey" FOREIGN KEY ("B") REFERENCES "Variation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
