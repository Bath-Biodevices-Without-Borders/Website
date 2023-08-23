import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { colorInterpolate, color1, color2, hslToString } from '../../../scripts/colors';

import './nav_button.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface INavButtonProps {
  text: string,
  icon: IconDefinition,
  link: string,
  lnIntFraction: number,
  isFocused: boolean,
  handleNavButtonClick: () => void
}

export default function NavButton(props: INavButtonProps) {
  const [isHovered, setHovered] = useState(false);

  const color = hslToString(colorInterpolate(color1, color2, props.lnIntFraction));

  return (
    <div
      className={`nav-button-container`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => props.handleNavButtonClick()}
    >
      <Link to={props.link}>
        <div className='nav-button' style={{
          borderColor: color,
          color: color,
          backgroundColor: isHovered ? color : "transparent"
          }}>
          <div className='icon'>
            <FontAwesomeIcon icon={props.icon} />
          </div>
          <div className='label' style={{
            maxWidth: (isHovered || props.isFocused) ? "15rem" : "0rem",
            paddingRight: (isHovered || props.isFocused) ? "0.5rem" : "0rem"
          }}>
           {props.text}
          </div>
        </div>
      </Link>
    </div>
  )
}
