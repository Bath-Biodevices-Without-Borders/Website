import React from 'react';
import './custom_button.css';

export default function CustomButton(props: { children: any, lnIntFraction: number }) {
  return (
    <div className='custom-button'>
      <div className='flex'>
        {
          props.children
        }
      </div>
    </div>
  )
}
