import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const filtre = [
        {
            nume: "brand",
            valoare: searchParams.getAll("brand[]")
        },
        {
            nume: "culoare",
            valoare: searchParams.getAll("culoare[]")
        },
        {
            nume: "tipIntrerupator",
            valoare: searchParams.getAll("tip_intrerupator[]")
        },
        {
            nume: "vizualizate",
            valoare: searchParams.get("vizualizate[]")
        },
        {
            nume: "orderBy[id]",
            valoare: searchParams.get("orderBy[id]")
        },
        {
            nume: "pretMin",
            valoare: searchParams.get("pretMin")
        },
        {
            nume: "pretMax",
            valoare: searchParams.get("pretMax")
        },
    ]

    const where: any = {}
    const orderBy: any = {}
    
    filtre.forEach((filtru, index) => {
        if (filtru.valoare && filtru.nume) {
            if (filtru.nume === "pretMin" || filtru.nume === "pretMax") {
                const minPrice = searchParams.get("pretMin") ? parseFloat(searchParams.get("pretMin") as string) : undefined;
                const maxPrice = searchParams.get("pretMax") ? parseFloat(searchParams.get("pretMax") as string) : undefined;

                if (!where.pret) where.pret = {};
                
                if (minPrice !== undefined) where.pret.gte = minPrice;
                if (maxPrice !== undefined) where.pret.lte = maxPrice;
            } else if (filtru.nume === "vizualizate") {
                orderBy.id = filtru.valoare;
            } else if (filtru.nume === "orderBy[id]") {
                orderBy.id = String(searchParams.get("orderBy[id]"));
            } else if (Array.isArray(filtru.valoare) && filtru.valoare.length > 0) {
                where[filtru.nume] = { in: filtru.valoare };
            }
        } 
    })

    try {
        const produse = await prisma.produs.findMany({
            where: Object.keys(where).length ? where : undefined,
            orderBy: Object.keys(orderBy).length ? orderBy: {id: "asc"}
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

          Object.values(grouped).forEach(prod => {
            if (orderBy.id === "desc") {
                prod.variants.reverse();
            }
        });
          const finalProducts = orderBy.id === "desc" ? Object.values(grouped).reverse() : Object.values(grouped);
        return NextResponse.json(finalProducts);
    } catch (error) {
        return NextResponse.json({ error: NextResponse.error }, { status: 500 })
    }
}