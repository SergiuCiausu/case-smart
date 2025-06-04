import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { prod: string }}) {
    const { prod } = await params;
    const produse = await prisma.produs.findMany({
        where: {
            url: prod
        },
        orderBy: {
            id: "asc"
        }
    });
    const grouped = produse.reduce((acc, produs) => {
        if (!acc[produs.url]) {
          acc[produs.url] = { 
            ...produs, 
            variants: [] 
          };
        }
        acc[produs.url].variants.push({ culoare: produs.culoare, img: produs.img});
        return acc;
      }, {});
    const finalProducts = Object.values(grouped);
    return NextResponse.json(finalProducts);
}