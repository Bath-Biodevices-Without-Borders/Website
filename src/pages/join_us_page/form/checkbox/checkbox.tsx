import React, { PropsWithChildren } from 'react'
import './checkbox.css'
import { UseFormRegister } from 'react-hook-form'

export default function Checkbox(
  {
    name,
    id,
    register,
    validation,
    children,
  } : PropsWithChildren<{
    name: string,
    id: string,
    register: UseFormRegister<any>,
    validation: (team: any) => boolean | string,
  }>,
) {
  return (
    <label className='custom-checkbox'>
      <input
        type='checkbox'
        value={id}
        {...register(name, { validate: validation })}
        // onClick={() => validation(id)}
      />
      <span className='checkmark'></span>
      <p>
        {children}
      </p>
    </label>
  )
}
