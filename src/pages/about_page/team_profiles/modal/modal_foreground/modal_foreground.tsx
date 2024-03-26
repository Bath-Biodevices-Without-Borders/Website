import React from 'react'
import './modal_foreground.css'

import Blank from '../../../../../images/team_profiles/blank.jpg'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { I_modalProps } from '../../../../../types/types'

import ImageErrorBoundary from '../../../../../components/image/image_error_boundary'
import LinkIcons from '../../../../../components/link_icons/link_icons'

export default function ModalForeground(props: I_modalProps) {
  return (
    <div className='modal-foreground'>
      <aside>
        <figure>
          <ImageErrorBoundary
            fallbackImage={Blank}
            image={props.image}
          />
        </figure>
        <span>
          <h5>Duration</h5>
          <div className="time-span">
            <p>{props.startDate.split('-')[0]} - {props.endDate.split('-')[0]}</p>
          </div>
          <h5>Roles</h5>
          <div className="roles">
            {
              props.roles.map(({role, team}, index) => (
                <div className="role">
                  <p>{role}</p>
                  <p>{team}</p>
                </div>
              ))
            }
          </div>
          <div className='social-links'>
            <LinkIcons link={props.link} darkMode={true} />
          </div>
        </span>
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
        <div className='close-button'>
          <FontAwesomeIcon icon={faXmark} onClick={() => props.handleSelection(-1)} />
        </div>
      </footer>
    </div>
  )
}
