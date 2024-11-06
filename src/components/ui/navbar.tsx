import Link from "next/link";

export default function Navbar({
  region,
  nick,
}: {
  region: string;
  nick: string;
}) {
  return (
    <nav>
      <ul className="absolute top-0 z-40 flex gap-10 p-10">
        <li>
          <Link
            href={`/summoner/${region}/${nick}/overview`}
            className="focus:border-b-[1px] border-amber-100"
          >
            OVERVIEW
          </Link>
        </li>
        <li>
          <Link
            href={`/summoner/${region}/${nick}/matches-history`}
            className="focus:border-b-[1px] border-amber-100"
          >
            MATCH HISTORY
          </Link>
        </li>
        <li>
          <Link
            href={`/summoner/${region}/${nick}/ranked`}
            className="focus:border-b-[1px] border-amber-100"
          >
            RANKED
          </Link>
        </li>
        <li>
          <Link
            href={`/summoner/${region}/${nick}/champions`}
            className="focus:border-b-[1px] border-amber-100"
          >
            CHAMPIONS
          </Link>
        </li>
      </ul>
    </nav>
  );
}
