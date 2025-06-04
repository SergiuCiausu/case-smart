import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const produseRecomandate = await prisma.produs.findMany({
        orderBy: {
            id: "asc",
        }
    })
    const grouped = produseRecomandate.reduce((acc, produs) => {
        if (!acc[produs.grup_produs]) {
          acc[produs.grup_produs] = { 
            ...produs, 
            variants: [] 
          };
        }
        acc[produs.grup_produs].variants.push({ culoare: produs.culoare, img: produs.img});
        return acc;
      }, {});
    const finalProduseRecomandate = Object.values(grouped);
    return NextResponse.json(finalProduseRecomandate);
}