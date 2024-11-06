import { gameVersion } from "@/lib/utils";
import Image from "next/image";

export default async function BGImage({
  region,
  puuid,
}: {
  region: string;
  puuid: string;
}) {
  // Get Summoner mastery data
  const masteryREQ = await fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?api_key=${process.env.API_KEY}`
  );
  const masteryRES = await masteryREQ.json();
  const highChampionMastery = masteryRES[0].championId;

  // Get All List Champions to match background image
  const championsListREQ = await fetch(
    `https://ddragon.leagueoflegends.com/cdn/${gameVersion}/data/en_US/champion.json`
  );
  const championsListRES = await championsListREQ.json();
  let championMatch: string = "";
  Object.values(championsListRES.data).forEach((champion) => {
    if (champion.key === `${highChampionMastery}`) {
      championMatch = `${champion.name}`;
    }
  });
  return (
    <Image
      src={`/dragontail-${gameVersion}/img/champion/splash/${championMatch}_0.jpg`}
      alt={`${championMatch}`}
      fill
      sizes="100vw"
      style={{ objectFit: "cover" }}
    />
  );
}
