export type T_role = {
  team: string;
  role: string;
  lead: boolean;
};

export type T_teamMember = {
  id: number;
  name: string;
  email: string;
  course: string;
  link: string;
  description: string;
  image: string | any;
  startYear: number;
  endYear: number;
  legacy: boolean;
  isLegacy: boolean;
  roles: T_role[];
};

export type T_teamMembers = {
  [key: string]: T_teamMember[];
};

export type T_orgIcons = {
  [key: string]: any;
};

export type T_orgDetails = {
  [key: string]: {
      icon: any,
      description: string,
      members: T_teamMember[],
      legacyMembers: T_teamMember[]
  };
};

export interface I_teamSectionProps {
  index: number;
  teamName: string;
  showLegacy: boolean;
  selectedIndex: number;
  handleSelection: (index: number) => void;
  icon: any;
  description: string;
  members: T_teamMember[];
  legacyMembers: T_teamMember[];
};

export interface I_profileProps extends T_teamMember {
  isSelected: boolean;
  handleSelection: (index: number) => void;
  isLead: boolean;
  team: string;
};

export interface I_modalProps extends T_teamMember {
  handleSelection: (index: number) => void;
};

export interface I_navOptionsProps {
  handleClick: () => void,
  navType: E_NavType
}

export enum E_NavType { 
  Menu,
  Bar
};