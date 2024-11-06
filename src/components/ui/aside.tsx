import Avatar from "./avatar";

export default function Aside({
  profileIconId,
  summonerLevel,
  gameName,
}: {
  profileIconId: number;
  summonerLevel: number;
  gameName: string;
}) {
  return (
    <aside
      className={`absolute top-0 bg-[url('/border.png')] bg-no-repeat bg-right-top bg-contain w-[380px] h-screen flex flex-col`}
    >
      <div className="relative left-32 top-32 w-fit text-center flex flex-col gap-4">
        <Avatar profileIconId={profileIconId} summonerLevel={summonerLevel} />
        <h1 className="font-semibold text-xl">{gameName}</h1>
      </div>
    </aside>
  );
}
