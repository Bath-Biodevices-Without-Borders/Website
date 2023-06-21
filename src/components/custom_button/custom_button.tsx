import React, { useEffect, useState } from 'react';
import { colors, DiagonalBackground } from '../../variables';
import './custom_button.css';

export default function CustomButton(props: { children: any, lnIntFraction: number }) {
  const [background, setBackground] = useState({})

  useEffect(() => {
    const hue = ((Math.abs(colors[0].h - colors[4].h) * props.lnIntFraction) + colors[4].h) % 360;
    setBackground(DiagonalBackground({ h: hue, s: 100, l: 25 }, { h: hue, s: 100, l: 75 }));
  }, [props.lnIntFraction])

  return (
    <div className='custom-button'>
      <div className='flex'>
        {
          props.children
        }
      </div>
    </div>
  )
}
