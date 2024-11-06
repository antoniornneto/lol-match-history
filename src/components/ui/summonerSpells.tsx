import Image from "next/image";

export default async function SummonerSpells({
  ss1,
  ss2,
}: {
  ss1: string;
  ss2: string;
}) {
  const reqSS = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/14.21.1/data/en_US/summoner.json"
  );
  const resSS = await reqSS.json();
  const data = Object.values(resSS.data);

  return (
    <div className="flex">
      {/* SS D */}
      <div>
        {data.map((summonerspell) => (
          <div key={summonerspell.key}>
            {summonerspell.key == ss1 ? (
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/spell/${summonerspell.image.full}`}
                alt={summonerspell.image.full}
                width={30}
                height={30}
                className="rounded-md"
              />
            ) : null}
          </div>
        ))}
      </div>
      {/* SS F */}
      <div>
        {data.map((summonerspell) => (
          <div key={summonerspell.key}>
            {summonerspell.key == ss2 ? (
              <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/spell/${summonerspell.image.full}`}
                alt={summonerspell.image.full}
                width={30}
                height={30}
                className="rounded-md"
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
