-- CreateTable
CREATE TABLE "Produs" (
    "id" SERIAL NOT NULL,
    "cod_produs" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL DEFAULT 0,
    "totalRecenzii" INTEGER NOT NULL,
    "pret" INTEGER NOT NULL,
    "reducere" INTEGER,
    "descriere_produs" TEXT NOT NULL,
    "descriere" TEXT NOT NULL,
    "specificatii" TEXT NOT NULL,

    CONSTRAINT "Produs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recenzie" (
    "id" SERIAL NOT NULL,
    "produsId" INTEGER NOT NULL,
    "nume" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comentariu" TEXT NOT NULL,

    CONSTRAINT "Recenzie_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Recenzie" ADD CONSTRAINT "Recenzie_produsId_fkey" FOREIGN KEY ("produsId") REFERENCES "Produs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
