import Image from "next/image";

export default function Avatar({
  profileIconId,
  summonerLevel,
}: {
  profileIconId: number;
  summonerLevel: number;
}) {
  return (
    <div className="flex relative py-3 w-fit h-fit">
      <Image
        src={`https://ddragon.leagueoflegends.com/cdn/14.21.1/img/profileicon/${profileIconId}.png`}
        alt="/"
        width={130}
        height={130}
        className="rounded-full border-2 border-yellow-500"
      />
      <div className="absolute bg-slate-900 bottom-0 left-12 p-1 border-2 border-yellow-500 rounded-full text-sm text-gray-400 font-extrabold">
        {summonerLevel}
      </div>
    </div>
  );
}
