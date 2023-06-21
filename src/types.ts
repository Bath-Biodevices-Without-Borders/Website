export interface  INavButton {
  id: string,
  text: string,
  link: string
};

export interface IColors {
  h: number;
  s: number;
  l: number;
}

export interface IHighlightCard {
  id: string,
  title: string,
  text: string,
  img: string,
  alt: string,
  href: string
};

export interface IMember {
  name: string,
  title: string,
  text: string,
  imgIdx: number,
  alt: string
}

export interface ITeam {
  id: string,
  name: string,
  text: string,
  members: IMember[]
}

export interface IEvent {
  title: string,
  description: string,
  imgIdx: number,
  alt: string
}

export interface ITimeline {
  year: number,
  events: IEvent[]
}