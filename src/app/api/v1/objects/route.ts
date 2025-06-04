import { NextRequest, NextResponse } from "next/server";
import server from "../../server";

export const GET = async (request: NextRequest) => {
  try {
    const data = await server.Objects.list();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET request:", error);
    return new Response("Internal Server Error", { status: 500 });
    
  }
}