/*
  Warnings:

  - Added the required column `requestDate` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "requestDate" TIMESTAMP(3) NOT NULL;
