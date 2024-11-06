import Image from "next/image";

type RankProps = {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  leaguePoints: number;
  wins: number;
  losses: number;
};

export default async function RankStats({ id }: { id: string }) {
  const ranksREQ = await fetch(
    `https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.API_KEY}`
  );
  const ranksRES = await ranksREQ.json();

  return (
    <div className="absolute w-[100vw] h-[50%] bottom-0 z-20 border-none backdrop-blur-[3px] flex justify-center items-center">
      <div className="flex gap-20">
        {ranksRES.map((rank: RankProps) => (
          <div key={rank.leagueId}>
            <div className="flex flex-col items-center">
              <Image
                src={`/ranked-emblems/Rank=${rank.tier}.png`}
                alt={rank.tier}
                width={200}
                height={200}
              />
              <div className="text-xl text-center font-semibold">
                <p>
                  {rank.queueType === "RANKED_FLEX_SR"
                    ? "Flex 5x5"
                    : "Solo/Duo"}
                </p>
                <p>
                  {rank.tier} {rank.rank}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
