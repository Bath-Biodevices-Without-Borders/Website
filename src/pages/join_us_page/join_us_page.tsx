import React from 'react'
import './join_us_page.css'


import Hero from '../../components/hero/hero'
import Form from './form/form'

export default function JoinUsPage() {
  return (
    <div className='join-us-page'>
      <Hero useParallax={false} imageUrl='https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'>
        <h1>Join Us</h1>
      </Hero>
      <Form />
    </div>
  )
}
