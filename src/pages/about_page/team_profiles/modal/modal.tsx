import React from 'react'
import './modal.css'

import ModalForeground from './modal_foreground'
import ModalBackground from './modal_background'

import { I_modalProps } from '../../../../types/types'

export default function Modal(props: I_modalProps) {
  return (
    <div className='modal'>
      <ModalForeground {...props} />
      <ModalBackground {...props} />
    </div>
  )
}
