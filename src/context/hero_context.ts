import { createContext } from "react";

export const HeroContext = createContext<{
  heroRef: React.RefObject<HTMLDivElement> | undefined;
  setHeroRef: (ref: React.RefObject<HTMLDivElement>) => void;
}>({
  heroRef: undefined,
  setHeroRef: () => {}
});