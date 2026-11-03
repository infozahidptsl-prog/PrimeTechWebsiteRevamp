import React from "react";
import { CarFrontIcon, ClapperboardIcon, FlaskConicalIcon, HeartPulseIcon, HotelIcon, LandmarkIcon, LineChartIcon, PillIcon, ShieldCheckIcon, SproutIcon, StoreIcon, TruckIcon, ZapIcon, BoxIcon } from "lucide-react";
import { IndustryIconKey } from "../data/site";
const map: Record<IndustryIconKey, BoxIcon> = {
  fintech: LineChartIcon,
  pharma: PillIcon,
  energy: ZapIcon,
  healthcare: HeartPulseIcon,
  insurance: ShieldCheckIcon,
  biotech: FlaskConicalIcon,
  government: LandmarkIcon,
  logistics: TruckIcon,
  hospitality: HotelIcon,
  automotive: CarFrontIcon,
  retail: StoreIcon,
  agriculture: SproutIcon,
  media: ClapperboardIcon
};
export function IndustryIcon({
  id


}: {id: IndustryIconKey;}) {
  const Icon = map[id];
  return <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[6px] border border-white/80">
      <Icon className="h-7 w-7" strokeWidth={1.25} aria-hidden />
    </span>;
}