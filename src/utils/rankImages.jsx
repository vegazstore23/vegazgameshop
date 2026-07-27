import masterImg from "../assets/ranks/Master.webp";
import grandmasterImg from "../assets/ranks/Grandmaster.webp";
import epicImg from "../assets/ranks/Epic.webp";
import legendImg from "../assets/ranks/Legend.webp";
import mythicImg from "../assets/ranks/Mythic.webp";
import honorImg from "../assets/ranks/Mythical_Honor.webp";
import gloryImg from "../assets/ranks/Mythical_Glory.webp";
import immortalImg from "../assets/ranks/Mythical_Immortal.webp";

const RANK_IMAGES = {
  "mythical immortal": immortalImg,
  "mythic honor": honorImg,
  "mythic glory": gloryImg,
  grandmaster: grandmasterImg,
  mythic: mythicImg,
  master: masterImg,
  epic: epicImg,
  legend: legendImg,
};

export const getRankImage = (rankName) => {
  if (!rankName) return null;
  const key = rankName.toLowerCase().trim();

  const foundKey = Object.keys(RANK_IMAGES).find((k) => key.includes(k));

  return foundKey ? RANK_IMAGES[foundKey] : null;
};
