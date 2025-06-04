import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const limitePret = await prisma.produs.aggregate({
            _min: {
                pret: true
            },
            _max: {
                pret: true
            }
        })
        return NextResponse.json({ pretMin: limitePret._min.pret, pretMax: limitePret._max.pret});
    } catch (error) {
        return NextResponse.json({ error: NextResponse.error }, { status: 500 });
    }
}