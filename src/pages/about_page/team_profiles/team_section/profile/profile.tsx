import React, {useEffect, useState} from 'react'
import './profile.css'

import { I_profileProps, T_role } from '../../../../../types/types';

import Blank from '../../../../../images/team_profiles/blank.jpg'
import LinkIcons from '../../../../../components/link_icons/link_icons'
import ImageErrorBoundary from '../../../../../components/image/image_error_boundary'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Profile(props: I_profileProps) {
  const [style, setStyle] = useState({} as React.CSSProperties)

  useEffect(() => {
    if (props.isSelected || props.isLead) {
      setStyle({
        color: 'var(--Lavander)'
      })
    } else {
      setStyle({
        color: 'var(--OxfordBlue)'
      })
    }
  }, [props.isSelected, props.isLead])

  const isFounder = props.email === 'jd2099@bath.ac.uk' || props.email === 'tm907@bath.ac.uk'

  return (
    <label
      className={`pm-container ${props.isSelected ? "modal" : "profile"}-container`}
      style={style}
      htmlFor={`${props.index}-modal`}
    >
      <input
        type='checkbox'
        name='team-profile'
        id={`${props.index}-profile`}
        checked={props.isSelected}
        disabled={props.isSelected}
        onChange={() => props.handleSelection(props.index)}
      />
      <input
        type='checkbox'
        name='team-profile'
        id={`${props.index}-modal`}
        checked={props.isSelected}
        disabled={!props.isSelected}
        onChange={() => props.handleSelection(props.index)}
      />
      <label
        className={`profile ${props.isLead ? "lead" : "non-lead"}`}
        htmlFor={`${props.index}-profile`}
      >
        <figure>
          <ImageErrorBoundary
            fallbackImage={Blank}
            image={props.image}
          />
          <div
            className='founder-badge'
            style={{visibility: isFounder ? 'visible' : 'hidden' }}
          >
            <FontAwesomeIcon icon={faStar} />
            Founder
          </div>
        </figure>
        <aside>
          <div className="time-span">
            <h5>Duration</h5>
            <p>{props.startDate.split('-')[0]} - {props.endDate.split('-')[0]}</p>
          </div>
          <div className="roles">
          <h5>Roles</h5>
            {
              props.roles.map(({role, team}: T_role, index: number) => (
                <div className={`role ${team === props.team ? "main-role" : "sub-role"}`}>
                  <p>{role}</p>
                  <p>{team}</p>
                </div>
              ))
            }
          </div>
          <div className='social-links'>
            <LinkIcons link={props.link} darkMode={true} />
          </div>
        </aside>
        <main>
          <header>
            <h4>{props.name}</h4>
            <h5>{props.course}</h5>
          </header>
          <main>
            {props.description}
          </main>
        </main>
        <footer>
          <label
            className='close-button'
            htmlFor={`${props.index}-modal`}
          >
            <FontAwesomeIcon icon={faXmark} onClick={() => props.handleSelection(-1)} />
          </label>
        </footer>
      </label>
    </label>
  )
}
