import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {

    const produse = await prisma.produs.findMany({
        orderBy: {
            id: "asc"
        }
    })

    const grouped = produse.reduce((acc, produs) => {
        if (!acc[produs.grup_produs]) {
          acc[produs.grup_produs] = { 
            ...produs, 
            variants: [] 
          };
        }
        acc[produs.grup_produs].variants.push({ culoare: produs.culoare, img: produs.img});
        return acc;
      }, {});

      const finalProducts = Object.values(grouped);
    return NextResponse.json(finalProducts);

    if (!produse) {
        return NextResponse.json("Error occured");
    }

    return NextResponse.json(produse);
}
    