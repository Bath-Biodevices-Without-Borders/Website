import React, { useEffect } from 'react'
import './form.css'
import { SubmitHandler, useForm } from 'react-hook-form'

import Checkbox from './checkbox/checkbox'
import { I_FormInput, T_TeamStrings } from '../../../types/types'

export default function Form() {
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
    console.log('data:', data);
    console.log('errors:', errors);
  }

  useEffect(() => {
    console.log(errors);
  }, [errors])

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
          <textarea {...register('message')}/>
        </section>
        <section>
          <button type='submit'>Submit</button>
        </section>
      </form>
    </div>
  )
}
