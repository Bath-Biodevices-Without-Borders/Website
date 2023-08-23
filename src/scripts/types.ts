import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export type THSL = {h: number; s: number; l: number};

export interface  TNavButton {
  id: string,
  text: string,
  link: string,
  icon: IconDefinition
};