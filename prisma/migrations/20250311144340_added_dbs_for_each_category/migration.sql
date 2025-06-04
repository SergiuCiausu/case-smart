/*
  Warnings:

  - A unique constraint covering the columns `[cod_produs]` on the table `Produs` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "IntrerupatoareTouch" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "IntrerupatoareTouch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrizeRamaSticla" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "PrizeRamaSticla_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntrerupatorPriza" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "IntrerupatorPriza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrizaMedia" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "PrizaMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telecomanda" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "Telecomanda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SmartHome" (
    "id" SERIAL NOT NULL,
    "codProdus" INTEGER NOT NULL,

    CONSTRAINT "SmartHome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorii" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,

    CONSTRAINT "Categorii_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produs_cod_produs_key" ON "Produs"("cod_produs");

-- AddForeignKey
ALTER TABLE "IntrerupatoareTouch" ADD CONSTRAINT "IntrerupatoareTouch_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrizeRamaSticla" ADD CONSTRAINT "PrizeRamaSticla_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntrerupatorPriza" ADD CONSTRAINT "IntrerupatorPriza_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrizaMedia" ADD CONSTRAINT "PrizaMedia_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telecomanda" ADD CONSTRAINT "Telecomanda_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SmartHome" ADD CONSTRAINT "SmartHome_codProdus_fkey" FOREIGN KEY ("codProdus") REFERENCES "Produs"("cod_produs") ON DELETE RESTRICT ON UPDATE CASCADE;
