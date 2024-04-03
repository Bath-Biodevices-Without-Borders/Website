import React, { useEffect } from 'react'
import './profile.css'

import { AnimatePresence, motion, Variant } from 'framer-motion'

import { I_profileProps, T_role } from '../../../../../types/types';

import Blank from '../../../../../images/team_profiles/blank.jpg'
import LinkIcons from '../../../../../components/link_icons/link_icons'
import ImageErrorBoundary from '../../../../../components/image/image_error_boundary'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Profile(props: I_profileProps) {

  useEffect(() => {
    if (props.isSelected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [props.isSelected])

  const transitionTime = 0.2;

  const containerVariant: { active: Variant, inactive: Variant } = {
    active: {
      overflow: 'visible',
      transition: { duration: 0 }
    },
    inactive: {
      overflow: 'hidden',
      transition: { duration: 0, delay: transitionTime }
    }
  }

  const pmVariant: { active: Variant, inactive: Variant } = {
    active: {
      zIndex: 1000,
      color: 'var(--Lavander)',
      backgroundColor: 'var(--OxfordBlue)',
      transition: {
        duration: transitionTime,
        zIndex: { duration: 0 }
      }
    },
    inactive: {
      zIndex: 0,
      color: props.isLead ? 'var(--Lavander)' : 'var(--OxfordBlue)',
      backgroundColor: props.isLead ? 'var(--Teal)' : '#fff',
      transition: {
        duration: transitionTime,
        zIndex: { duration: 10, delay: transitionTime }
      }
    }
  }

  const isFounder = props.email === 'jd2099@bath.ac.uk' || props.email === 'tm907@bath.ac.uk'

  return (
    <AnimatePresence>
      <motion.div
        className={`pm-container ${props.isSelected ? 'modal' : 'profile'}-container`}
        initial={'inactive'}
        animate={props.isSelected ? 'active' : 'inactive'}
        variants={containerVariant}
      >
        {
          props.isSelected &&
          <motion.div
            className={`modal-bg`}
            onClick={() => props.handleSelection(props.id)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: transitionTime }}
          />
        }
        <motion.div
          onClick={props.isSelected ? () => {} : () => props.handleSelection(props.id)}
          className={`profile ${props.isLead ? "lead" : "non-lead"}`}
          layout
          transition={{ duration: transitionTime }}
          variants={pmVariant}
        >
          <motion.figure layoutId={`${props.id}-figure`}>
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
          </motion.figure>
          <motion.aside>
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
            <motion.div
              className='social-links'
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.5 }}
            >
              <LinkIcons link={props.link} darkMode={true} />
            </motion.div>
          </motion.aside>
          <motion.main>
            <motion.header>
              <motion.h4>{props.name}</motion.h4>
              <motion.h5>{props.course}</motion.h5>
            </motion.header>
            <motion.main
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {props.description}
            </motion.main>
          </motion.main>
          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.label
              className='close-button'
              htmlFor={`${props.id}-modal`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.5 }}
            >
              <FontAwesomeIcon icon={faXmark} onClick={() => props.handleSelection(-1)} />
            </motion.label>
          </motion.footer>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
