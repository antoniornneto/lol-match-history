import LayoutPage from "@/components/ui/layoutPage";
import RankStats from "@/components/ui/rankStats";
import { SummonerProfileProps, SummonerProps } from "@/lib/types";
import { riotURL } from "@/lib/utils";

const page = async ({
  params,
}: {
  params: { region: string; nickName: string };
}) => {
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
        {null}
      </LayoutPage>
      {/* Blur effect */}
      <RankStats id={summonerProfileRES.id} />
    </main>
  );
};

export default page;
