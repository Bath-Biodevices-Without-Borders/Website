import React, { useState } from 'react';

import './nav_bar.css';

import NavButton from './nav_button/nav_button';

import { TNavButton } from '../../scripts/types';

export default function NavBar(props: {buttons: TNavButton[]}) {
  const [focusedButtons, setFocusedButtons] = useState(props.buttons.map((button: any) => false))

  const handleNavButtonClick = (index: number) => {
    setFocusedButtons(props.buttons.map((button: any, buttonIndex: number) => index === buttonIndex))
  }

  return (
    <nav>
      <ul className={"nav-list"}>
        {
          props.buttons.map((button: TNavButton, index: number) => {
            return (
              <li key={index}>
                <NavButton
                  text={button.text}
                  icon={button.icon}
                  link={button.link}
                  isFocused={focusedButtons[index]}
                  lnIntFraction={index/props.buttons.length}
                  handleNavButtonClick={() => handleNavButtonClick(index)}/>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}