/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import SummonerSpells from "./summonerSpells";
import { gameVersion } from "@/lib/utils";
import { FaCoins } from "react-icons/fa";
import { GiBarbute } from "react-icons/gi";
import Perks from "./perks";

export default async function Match({
  puuid,
  matchId,
}: {
  puuid: string;
  matchId: string;
}) {
  const reqGetMatchData = await fetch(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.API_KEY}`
  );
  const resGetMatch = await reqGetMatchData.json();
  const matchData = resGetMatch.info.participants;
  const typeMatch = resGetMatch.info.queueId;

  let dataPlayer: any = [];
  matchData.forEach((data: any) => {
    if (data) {
      dataPlayer = [
        ...dataPlayer,
        {
          side: data.teamId,
          gameType: typeMatch,
          champion: data.championName,
          championId: data.championId,
          level: data.champLevel,
          kill: data.kills,
          assist: data.assists,
          death: data.deaths,
          gold: data.goldEarned,
          farm: data.totalMinionsKilled,
          position: data.teamPosition,
          puuid: data.puuid,
          nick: `${data.riotIdGameName} #${data.riotIdTagline}`,
          win: data.win,
          damageToBuildings: data.damageDealtToBuildings,
          summonerSpells: [data.summoner1Id, data.summoner2Id],
          build: [
            data.item0,
            data.item1,
            data.item2,
            data.item3,
            data.item4,
            data.item5,
            data.item6,
          ],
          perks: {
            primary: [data.perks.styles[0]],
            secondary: [data.perks.styles[1]],
            stats: [data.perks.statPerks],
          },
        },
      ];
    }
  });
  return (
    <div>
      {dataPlayer.map((player: any) => (
        <div key={player.puuid} className="flex justify-center">
          {puuid === player.puuid ? (
            <div className="py-4">
              <div className="w-fit flex gap-10">
                {/* Champion Avatar */}
                <div className="relative flex justify-center">
                  <Image
                    src={`/dragontail-${gameVersion}/img/champion/tiles/${player.champion}_0.jpg`}
                    alt={`${player.champion}`}
                    width={80}
                    height={100}
                    className="rounded-full border-2 border-amber-200"
                  />
                  <p className="absolute right-0 bottom-1 rounded-full border-2 border-amber-200 w-7 text-center bg-black">
                    {player.level}
                  </p>
                </div>
                {/* Result match and SS */}
                <div className="flex flex-col justify-center w-32">
                  <span
                    className={
                      player.win == true
                        ? "text-blue-600 font-semibold text-lg"
                        : "text-red-600 font-semibold text-lg"
                    }
                  >
                    {player.win == true ? "VICTORY" : "DEFEAT"}
                  </span>
                  <span>
                    {player.gameType == 420 ? "Ranked Solo/Duo" : "Ranked Flex"}
                  </span>
                  <SummonerSpells
                    ss1={player.summonerSpells[0]}
                    ss2={player.summonerSpells[1]}
                  />
                </div>
                {/* Build */}
                <div className="flex flex-col justify-around">
                  <div className="flex">
                    {player.build.map((item: any) =>
                      item ? (
                        <Image
                          key={""}
                          src={`/dragontail-14.21.1/14.21.1/img/item/${item}.png`}
                          alt={item}
                          width={40}
                          height={40}
                          className="border-[1px] border-amber-200"
                        />
                      ) : (
                        <span
                          key={""}
                          className="w-10 h-10 border-[1px] border-amber-200"
                        ></span>
                      )
                    )}
                  </div>
                  <div className="flex text-lg">
                    <span className="flex-1">{`${player.kill} / ${player.death} / ${player.assist}`}</span>
                    <span className="flex-1 flex items-center justify-center gap-1">
                      <GiBarbute />
                      {`${player.farm}`}
                    </span>
                    <span className="flex-1 flex items-center justify-end gap-1">
                      <FaCoins />
                      {`${player.gold.toLocaleString()}`}
                    </span>
                  </div>
                </div>
                {/* Perks */}
                <div>
                  <Perks
                    primary={player.perks.primary}
                    secondary={player.perks.secondary}
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

// <div
//   className={`${
//     player.win == true ? `bg-sky-700` : `bg-red-400`
//   } flex gap-3`}
// >
//   <div className="h-48 w-32 relative overflow-hidden pt-20">
//     <Image
//       src={`/dragontail-${gameVersion}/img/champion/loading/${player.champion}_0.jpg`}
//       alt={`${player.champion}`}
//       fill
//       sizes="100vw"
//       style={{
//         objectFit: "fill",
//         width: "100%",
//       }}
//       className="mt-16"
//     />
//   </div>
//   <div className="flex flex-col justify-center items-center gap-4">
//     <SummonerSpells
//       ss1={player.summonerSpells[0]}
//       ss2={player.summonerSpells[1]}
//     />
//     <Perks
//       primary={player.perks.primary}
//       secondary={player.perks.secondary}
//       stats={player.perks.stats}
//     />
//     <div>
//       <span className="text-2xl">{`${player.kill}/${player.death}/${player.assist}`}</span>
//     </div>
//   </div>
// </div>
