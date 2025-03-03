import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("GET Technologies API Hit!");
    const technologies = await prisma.technologies.findMany();
    return NextResponse.json(technologies);
  } catch (error) {
    console.log("Error fetching technologies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
