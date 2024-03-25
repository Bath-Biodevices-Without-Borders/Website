import React from 'react'
import ImageErrorBoundary from './image_error_boundary'
import './profile.css'

import Blank from '../../../../../images/team_profiles/blank.jpg'
import LinkIcons from './link_icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faStar } from '@fortawesome/free-solid-svg-icons'

export default function Profile(props: any) {

  const role = props.Roles.find((role: any) => role.Team === props.team)

  const isFounder = props.Email === 'jd2099@bath.ac.uk' || props.Email === 'tm907@bath.ac.uk'
  return (
    <div
      className='team-profile'
    >
      <input
        type='checkbox'
        name='team-profile'
        id={props.index}
        checked={props.isSelected}
        onChange={() => props.handleSelection(props.index)}
      />
      <label
        className='foreground'
        htmlFor={props.index}
        style={{ backgroundColor: props.isLead && !props.isLegacy ? '#094e4d' : 'white' }}
      >
        <div className='team-profile-image'>
          <ImageErrorBoundary
            image={props.Image}
            fallbackImage={Blank}
          />
          <div
            className='founder-badge'
            style={{ visibility: isFounder ? 'visible' : 'hidden' }}
          >
            <FontAwesomeIcon icon={faStar} />
            Founder
          </div>
        </div>
        <div className='team-profile-details'>
          <span className='team-profile-text'>
            <p className='member-name' style={{
              color: props.isLead && !props.isLegacy ? 'white' : 'black'
            }}>{props.Name}</p>
            <p style={{
              color: props.isLead && !props.isLegacy ? 'white' : 'black'
            }}>{role.Role}</p>
            <p style={{
              color: props.isLead && !props.isLegacy ? 'white' : 'black'
            }}>{props.Course}</p>
          </span>
          <LinkIcons link={props.Link} darkMode={props.isLead && !props.isLegacy} />
        </div>
      </label>
      <label
        htmlFor={props.index}
        className="legacy-overlay"
        style={{
          display: props.isLegacy ? 'block' : 'none'
        }}
      >
      </label>
      <div className='background'>
        <div className='profile-description'>
          <p className='member-name'>{props.Name}</p>
          <p>{props.Description}</p>
        </div>  
        <label htmlFor={props.index}>
            <FontAwesomeIcon icon={faXmark} />
          </label>
      </div>
    </div>
  )
}
