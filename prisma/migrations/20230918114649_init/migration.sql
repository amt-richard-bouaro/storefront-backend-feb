-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Business', 'Customer');

-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('local', 'google', 'facebook');

-- CreateEnum
CREATE TYPE "Remarks" AS ENUM ('Disappointing', 'Great', 'Satisfied');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "provider" "Provider" NOT NULL,
    "providerId" TEXT NOT NULL,
    "verificationToken" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "mustChangePassword" BOOLEAN NOT NULL DEFAULT false,
    "canResetPassword" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "picture" TEXT,
    "account" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" TEXT NOT NULL,
    "businessName" TEXT NOT NULL,
    "contact" TEXT,
    "location" TEXT,
    "businessType" TEXT,
    "websiteType" TEXT,
    "promotion" BOOLEAN NOT NULL DEFAULT false,
    "promotionDiscount" INTEGER NOT NULL DEFAULT 0,
    "currency" TEXT DEFAULT 'GHc',
    "account" TEXT NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandImage" TEXT,
    "brandColor" TEXT,
    "welcomeColor" TEXT,
    "welcomebtnText" TEXT,
    "welcomeText" TEXT,
    "fontstyle" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "auxillaryColor" TEXT,
    "storeStory" TEXT,
    "hasContactPage" BOOLEAN NOT NULL DEFAULT false,
    "hasAboutPage" BOOLEAN NOT NULL DEFAULT false,
    "business" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reasons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "paragraph" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "temp" TEXT NOT NULL,

    CONSTRAINT "Reasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Teams" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "template" TEXT NOT NULL,
    "temp" TEXT NOT NULL,

    CONSTRAINT "Teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Temp" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandImage" TEXT,
    "brandColor" TEXT,
    "welcomeColor" TEXT,
    "welcomebtnText" TEXT,
    "welcomeText" TEXT,
    "fontstyle" TEXT,
    "primaryColor" TEXT,
    "secondaryColor" TEXT,
    "auxillaryColor" TEXT,
    "storeStory" TEXT,
    "hasContactPage" BOOLEAN NOT NULL DEFAULT false,
    "hasAboutPage" BOOLEAN NOT NULL DEFAULT false,
    "template" TEXT NOT NULL,

    CONSTRAINT "Temp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "reStockLevel" INTEGER NOT NULL DEFAULT 0,
    "category" TEXT NOT NULL DEFAULT 'All',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "currency" TEXT NOT NULL DEFAULT 'GHc',
    "discount" INTEGER NOT NULL DEFAULT 0,
    "promotionProduct" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "business" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "business" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variation" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "product" TEXT NOT NULL,

    CONSTRAINT "Variation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "remarks" "Remarks" NOT NULL,
    "comment" TEXT,
    "reviewedBy" TEXT NOT NULL,
    "reviewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reply" (
    "id" TEXT NOT NULL,
    "comment" TEXT,
    "from" TEXT NOT NULL,
    "repliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "review" TEXT NOT NULL,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_account_key" ON "Customer"("account");

-- CreateIndex
CREATE UNIQUE INDEX "Business_account_key" ON "Business"("account");

-- CreateIndex
CREATE UNIQUE INDEX "Template_business_key" ON "Template"("business");

-- CreateIndex
CREATE UNIQUE INDEX "Temp_template_key" ON "Temp"("template");

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_account_fkey" FOREIGN KEY ("account") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_account_fkey" FOREIGN KEY ("account") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_business_fkey" FOREIGN KEY ("business") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reasons" ADD CONSTRAINT "Reasons_template_fkey" FOREIGN KEY ("template") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reasons" ADD CONSTRAINT "Reasons_temp_fkey" FOREIGN KEY ("temp") REFERENCES "Temp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_template_fkey" FOREIGN KEY ("template") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams" ADD CONSTRAINT "Teams_temp_fkey" FOREIGN KEY ("temp") REFERENCES "Temp"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Temp" ADD CONSTRAINT "Temp_template_fkey" FOREIGN KEY ("template") REFERENCES "Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_business_fkey" FOREIGN KEY ("business") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_business_fkey" FOREIGN KEY ("business") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variation" ADD CONSTRAINT "Variation_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_from_fkey" FOREIGN KEY ("from") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reply" ADD CONSTRAINT "Reply_review_fkey" FOREIGN KEY ("review") REFERENCES "Review"("id") ON DELETE CASCADE ON UPDATE CASCADE;
