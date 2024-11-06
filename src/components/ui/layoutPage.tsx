import { ReactNode } from "react";
import NickForm from "../form/NickForm";
import Aside from "./aside";
import BGImage from "./backgroundImg";
import Navbar from "./navbar";

export default async function PageLayout({
  region,
  puuid,
  nickName,
  profileIconId,
  summonerLevel,
  gameName,
  children,
}: {
  children: ReactNode | null;
  region: string;
  puuid: string;
  nickName: string;
  profileIconId: number;
  summonerLevel: number;
  gameName: string;
}) {
  return (
    <div>
      <BGImage puuid={puuid} region={region} />
      <Navbar region={region} nick={nickName} />
      <div className="relative z-30 flex">
        <Aside
          profileIconId={profileIconId}
          summonerLevel={summonerLevel}
          gameName={gameName}
        />
        <div className="flex flex-col pt-10 px-10 flex-1 items-center">
          <div className="self-end">
            <NickForm />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
