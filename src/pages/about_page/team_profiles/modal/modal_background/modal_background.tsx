import React from 'react'
import './modal_background.css'

import { I_modalProps } from '../../../../../types/types'

export default function ModalBackground(props: I_modalProps) {
  return (
    <div
      className='modal-background'
      onClick={() => props.handleSelection(-1)}
    >
    </div>
  )
}
