import { IColors } from './types';

export const url: string = 'http://localhost:3001/';

export const colors: IColors[] = [{ h: 312, s: 100, l: 50 }, { h: 277, s: 100, l: 50 }, { h: 248, s: 100, l: 50 }, { h: 219, s: 100, l: 50 }, { h: 191, s: 100, l: 50 }];

export const backgroundColor: IColors = { h: 0, s: 0, l: 100 };

export const PlusBackground = (fgColor: IColors, bgColor: IColors): {background: string; backgroundColor: string} => {
  return ({
    background: `
      radial-gradient(circle, transparent 20%, hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%) 20%, hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%) 80%, transparent 80%, transparent) 0% 0% / 30px 30px,
      radial-gradient(circle, transparent 20%, hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%) 20%, hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%) 80%, transparent 80%, transparent) 15px 15px / 30px 30px,
      linear-gradient(hsl(${fgColor.h}, ${fgColor.s}%, ${fgColor.l}%) 1.5px, transparent 1.5px) 0px -0.75px / 15px 15px,
      linear-gradient(90deg, hsl(${fgColor.h}, ${fgColor.s}%, ${fgColor.l}%) 1.5px, hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%) 1.5px) -0.75px 0px / 15px 15px hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)
    `,
    backgroundColor: `hsl(${bgColor.h}, ${bgColor.s}%, ${bgColor.l}%)`
  });
}

export const DiagonalBackground = (fgColor: IColors, bgColor: IColors): {backgroundImage: string; backgroundSize: string; backgroundColor: string} => {
  return ({
    backgroundImage: `repeating-linear-gradient(45deg, hsla(${fgColor.h}, ${fgColor.s}%, ${fgColor.l}%, 0.25) 0, hsla(${fgColor.h}, ${fgColor.s}%, ${fgColor.l}%, 0.25) 1.5px, transparent 0, transparent 50%)`,
    backgroundSize: `15px 15px`,
    backgroundColor: `hsl(${Math.round(bgColor.h)}, ${bgColor.s}%, ${bgColor.l}%)`
  });
}

