import LayoutPage from "@/components/ui/layoutPage";
import History from "@/components/ui/match-history";
import { SummonerProfileProps, SummonerProps } from "@/lib/types";
import { riotURL } from "@/lib/utils";

export default async function page({
  params,
}: {
  params: { region: string; nickName: string };
}) {
  const tag = `${params.nickName.split("-")[1].toLowerCase()}`;
  const nick = `${params.nickName.split("-")[0].toLowerCase()}`;
  const summonerREQ = await fetch(
    `${riotURL}/riot/account/v1/accounts/by-riot-id/${nick}/${tag}?api_key=${process.env.API_KEY}`
  );
  const summonerRES: SummonerProps = await summonerREQ.json();

  // Get Summoner profile data
  const summonerProfileREQ = await fetch(
    `https://${params.region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summonerRES.puuid}?api_key=${process.env.API_KEY}`
  );
  const summonerProfileRES: SummonerProfileProps =
    await summonerProfileREQ.json();
  return (
    <main
      className={`relative w-screen h-screen text-amber-100 z-10 box-border`}
    >
      <LayoutPage
        gameName={summonerRES.gameName}
        summonerLevel={summonerProfileRES.summonerLevel}
        puuid={summonerRES.puuid}
        region={params.region}
        nickName={params.nickName}
        profileIconId={summonerProfileRES.profileIconId}
      >
        <h1 className="text-4xl bg-black/60 rounded-xl p-3">
          Recent Games (LAST 30 GAMES)
        </h1>
        <History puuid={summonerRES.puuid} />
      </LayoutPage>
    </main>
  );
}
