import React, { PropsWithChildren, useContext, useEffect, useRef } from 'react'
import { HeroContext } from '../../context/hero_context';
import './hero.css';

import StaticHero from './static_hero';
import ParallaxHero from './parallax_hero';

type HeroProps = PropsWithChildren<{
  useParallax: boolean;
  imageUrl?: string;
  foregroundImage?: string;
  backgroundImage?: string;
  foregroundText?: string;
  backgroundText?: string;
}>;

export default function Hero(
  {
    useParallax,
    imageUrl,
    children,
  } : HeroProps
) {

  // The HeroContext is used to set the ref of the hero section and is therefore
  // used by the navigation bar to determine where it should be transparent or
  // have a background color. Without this context, the navigation bar would not
  // displayt correctly.
  const { setHeroRef } = useContext(HeroContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeroRef(ref);
    }
  }, [ref, setHeroRef]);

  return (
    <div className='hero' ref={ref}>
      {
        useParallax
          ? <ParallaxHero />
          : <StaticHero imageUrl={imageUrl}>
              {children}
            </StaticHero>
      }
    </div>
  )
}
