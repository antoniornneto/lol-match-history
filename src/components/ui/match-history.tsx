import { riotURL } from "@/lib/utils";
import Match from "./match";

export default async function History({ puuid }: { puuid: string }) {
  const req = await fetch(
    `${riotURL}/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=30&api_key=${process.env.API_KEY}`
  );
  const matchHistory = await req.json();

  return (
    <div className="w-[50%] h-[600px] flex flex-col gap-3 bg-black/70 rounded-2xl my-20 overflow-y-scroll scrollbar-hide">
      {matchHistory.map((matchId: string) => (
        <Match key={matchId} puuid={puuid} matchId={matchId} />
      ))}
    </div>
  );
}
