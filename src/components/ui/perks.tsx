/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import runes from "../../../runes.json";
import { gameVersion } from "@/lib/utils";

export default function Perks({
  primary,
  secondary,
}: {
  primary: any;
  secondary: any;
}) {
  const perk1 = primary[0].selections[0].perk;

  function findIconById(data: any, targetId: any) {
    for (const item of data) {
      for (const slot of item.slots) {
        for (const rune of slot.runes) {
          if (rune.id === targetId) {
            return rune.icon;
          }
        }
      }
    }
    return null;
  }

  const pathPerk1 = findIconById(runes, perk1);

  const perk2 = runes.filter((perk) => perk.id === secondary[0].style);
  const pathPerk2URL = `${perk2[0].icon}`;

  return (
    <div className="flex w-fit justify-center relative">
      <div className="relative w-14 h-14 overflow-hidden rounded-full">
        <Image
          src={`/dragontail-${gameVersion}/img/${pathPerk1}`}
          alt="/"
          fill
          sizes="100vw"
        />
      </div>
      <div className="absolute w-6 h-6 bottom-0 left-8 rounded-full">
        <Image
          src={`/dragontail-${gameVersion}/img/${pathPerk2URL}`}
          alt="/"
          fill
          sizes="100vw"
        />
      </div>
    </div>
  );
}
