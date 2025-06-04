import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { urls: string[] }}) {
    const urlParams = req.nextUrl.searchParams.get("urls");
    const urls = urlParams ? decodeURIComponent(urlParams).split(",").map(Number): [];
    console.log("URL: ", urls);
    try {
        const produseVizitate = await prisma.produs.findMany({
            where: {
                grup_produs: {
                    in: urls
                }
            },
            orderBy: {
                id: "asc"
            }
        });
        const grouped = produseVizitate.reduce((acc, produs) => {
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
    } catch (error) {
        return NextResponse.json({ error: "Database query failed" }, { status: 500 })
    }
}