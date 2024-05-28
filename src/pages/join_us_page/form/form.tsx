import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import './form.css'

import emailjs from '@emailjs/browser'

import Checkbox from './checkbox/checkbox'
import { I_FormInput, T_TeamStrings } from '../../../types/types'

import { faCircleCheck, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Form() {
  const navigate = useNavigate();

  const [isLoading, setLoading] = React.useState(false)
  const [hasSubmitted, setSubmitted] = React.useState(false)
  const [hasError, setError] = React.useState(false)

  const teams: T_TeamStrings[] = [
    'finance',
    'hardware',
    'outreach',
    'sensors',
    'social',
    'software',
  ]

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I_FormInput>()

  const onSubmit: SubmitHandler<I_FormInput> = data => {
    if (hasSubmitted) return

    let firstName = data.firstName.toLowerCase()
    let lastName = data.lastName.toLowerCase()

    firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1)
    lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1)

    const teams: string[] = data.teams.map((team: T_TeamStrings) => {
      const titleCase = team.charAt(0).toUpperCase() + team.slice(1)
      const withSpace = ` ${titleCase}`
      return withSpace
    })

    const templateParams = {
      from_name: firstName + ' ' + lastName,
      from_email: data.email,
      to_name: 'Biodevices Without Borders',
      message: data.message,
      teams: teams,
    }

    if (!process.env.REACT_APP_EMAIL_SERVICE_ID) {
      console.error('There is no email service ID')
    }

    if (!process.env.REACT_APP_EMAIL_TEMPLATE_ID) {
      console.error('There is no email template ID')
    }

    if (!process.env.REACT_APP_EMAIL_PUBLIC_KEY) {
      console.error('There is no email public key')
    }

    if (
      !process.env.REACT_APP_EMAIL_SERVICE_ID ||
      !process.env.REACT_APP_EMAIL_TEMPLATE_ID ||
      !process.env.REACT_APP_EMAIL_PUBLIC_KEY
    ) {
      return
    }

    setLoading(true)

    emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID || "",
      process.env.REACT_APP_EMAIL_TEMPLATE_ID || "",
      templateParams,
      { 
        publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY || "",
      }
    ).then(() => {
      setSubmitted(true)
      setError(false)
    }, (error) => {
      setSubmitted(false)
      setError(true)
      console.log(error)
    })
  }

  useEffect(() => {
    let unsubscriber: NodeJS.Timeout
    if (hasSubmitted || hasError) {
      unsubscriber = setTimeout(() => {
        setSubmitted(false)
        setError(false)
        navigate('/')
      }, 3000)
    }
    return () => clearTimeout(unsubscriber)
  })

  const emailValidation = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@bath.ac.uk$/
    const isValid = emailRegex.test(email)
    return isValid ? true : "Please enter a valid University of Bath email address."
  }

  const checkboxValidation = (teams: T_TeamStrings[] | boolean) => {
    console.log('selected teams:');
    console.log(teams);
    if (typeof teams === 'boolean') {
      return teams ? true : "Please select at least one team."
    } else {
      return teams.length > 0 ? true : "Please select at least one team."
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <section>
            <label htmlFor='first-name'>
              <p className='label'>First Name</p>
              {errors.firstName && <p className='required'>required</p>}
            </label>
            <input
              className={errors.firstName ? 'required-error' : ''}
              type='text'
              placeholder='John'
              {...register('firstName', { required: true })}
            />
          </section>
          <section>
            <label htmlFor='last-name'>
              <p>Last Name</p>
              {errors.lastName && <p className='required'>required</p>}
            </label>
            <input
              className={errors.lastName ? 'required-error' : ''}
              type='text'
              placeholder='Doe'
              {...register('lastName', { required: true })}
            />
          </section>
        </div>
        <section>
          <label htmlFor='email'>
            <p>University Email</p>
            {errors.email && <p className='required'>required</p>}
          </label>
          {errors.email && <p className='error-message'>{errors.email.message}</p>}
          <input
            className={errors.email ? 'required-error' : ''}
            type='email'
            placeholder='abc123@bath.ac.uk'
            {...register('email', { validate: emailValidation })}
          />
        </section>
        <section>
          <label htmlFor='team'>
            <p>Team</p>
            {errors.teams?.message && <p className='required'>required</p>}
          </label>
          {errors.email && <p className='error-message'>{errors.teams?.message}</p>}
          <div className={`checkboxes ${errors.teams ? "required-error" : ""}`}>
            {
              teams.map((team : T_TeamStrings) => (
                <Checkbox
                  key={team}
                  name='teams'
                  id={team}
                  register={register}
                  validation={checkboxValidation}
                >
                  {team.charAt(0).toUpperCase() + team.slice(1)}
                </Checkbox>
              ))
            }
          </div>
        </section>
        <section>
          <label htmlFor='message'>
            <p>Message</p>
            <p className='optional'>optional</p>
          </label>
          <p className='description'>Write a brief message detailing why you want to join Biodeivces Without Borders.</p>
          <textarea {...register('message', { maxLength: 1000 })} maxLength={1000} />
        </section>
        <section>
          <button
            className={hasSubmitted ? 'submitted' : isLoading ? 'loading' : 'ready'}
            type='submit'
          >
            {
              hasSubmitted
              ? <FontAwesomeIcon icon={faCircleCheck} />
              : isLoading ? <FontAwesomeIcon icon={faSpinner} spin />
              : 'Submit'
            }
          </button>
          {hasError && <p className='error-message'>There was an error submitting your application. Please try again later.</p>}
        </section>
      </form>
    </div>
  )
}
