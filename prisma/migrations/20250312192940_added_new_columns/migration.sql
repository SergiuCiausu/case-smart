/*
  Warnings:

  - You are about to drop the `Culoare` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Brand" AS ENUM ('LIVOLO', 'LUXION', 'OWON', 'SONOFF', 'TELLUR');

-- DropForeignKey
ALTER TABLE "Culoare" DROP CONSTRAINT "Culoare_produsId_fkey";

-- AlterTable
ALTER TABLE "Produs" ADD COLUMN     "brand" "Brand" NOT NULL DEFAULT 'LIVOLO',
ADD COLUMN     "culoare" "Culori" NOT NULL DEFAULT 'ROSU';

-- DropTable
DROP TABLE "Culoare";
