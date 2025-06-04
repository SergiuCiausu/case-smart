/*
  Warnings:

  - Added the required column `denumire_produs` to the `Produs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img` to the `Produs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Culori" AS ENUM ('ROSU', 'ALB', 'NEGRU', 'GALBEN', 'ROZ', 'VERDE', 'ALBASTRU');

-- AlterTable
ALTER TABLE "Produs" ADD COLUMN     "denumire_produs" TEXT NOT NULL,
ADD COLUMN     "img" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Culoare" (
    "id" SERIAL NOT NULL,
    "produsId" INTEGER NOT NULL,
    "culoare" "Culori"[],

    CONSTRAINT "Culoare_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Culoare" ADD CONSTRAINT "Culoare_produsId_fkey" FOREIGN KEY ("produsId") REFERENCES "Produs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
