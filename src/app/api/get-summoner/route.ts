import { riotURL } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nick = searchParams.get("nick");
    const tag = searchParams.get("tagline");
    const region = searchParams.get("region");
    const summonerREQ = await fetch(
      `${riotURL}/riot/account/v1/accounts/by-riot-id/${nick}/${tag}?api_key=${process.env.API_KEY}`
    );

    const summonerRES = await summonerREQ.json();
    return NextResponse.json({ summonerRES, region }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
