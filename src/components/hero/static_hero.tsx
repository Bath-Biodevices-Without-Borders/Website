import React, { PropsWithChildren } from 'react'

type StaticHeroProps = PropsWithChildren<{
  imageUrl: string | undefined;
}>

export default function StaticHero(
  {
    imageUrl,
    children,
  } : StaticHeroProps
) {
  return (
    <div className='static-hero'>
      <figure>
        <img src={imageUrl} alt='hero' />
      </figure>
      <div className='content'>
        {children}
      </div>
    </div>
  )
}
