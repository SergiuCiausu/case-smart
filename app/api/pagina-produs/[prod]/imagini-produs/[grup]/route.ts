import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { grup: number }}) {
    const { grup } = await params;
    const imaginiProdus = await prisma.imaginiProdus.findMany({
        where: {
            grup_produs: Number(grup)
        }
    })
    const imagini = imaginiProdus.map(imagine => {
        return [
            { imaginiROSU: [imagine.img1ROSU, imagine.img2ROSU, imagine.img3ROSU, imagine.img4ROSU, imagine.img5ROSU] },
            { imaginiNEGRU: [imagine.img1NEGRU, imagine.img2NEGRU, imagine.img3NEGRU, imagine.img4NEGRU, imagine.img5NEGRU] },
            { imaginiGALBEN: [imagine.img1GALBEN, imagine.img2GALBEN, imagine.img3GALBEN, imagine.img4GALBEN, imagine.img5GALBEN] },
            { imaginiVERDE: [imagine.img1VERDE, imagine.img2VERDE, imagine.img3VERDE, imagine.img4VERDE, imagine.img5VERDE] },
            { imaginiROZ: [imagine.img1ROZ, imagine.img2ROZ, imagine.img3ROZ, imagine.img4ROZ, imagine.img5ROZ] },
            { imaginiALBASTRU: [imagine.img1ALBASTRU, imagine.img2ALBASTRU, imagine.img3ALBASTRU, imagine.img4ALBASTRU, imagine.img5ALBASTRU] },
          ];
        }).flat()
    return NextResponse.json(imagini);
}