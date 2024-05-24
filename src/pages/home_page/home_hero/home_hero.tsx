import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import './home_hero.css'

import HeroBg from '../../../images/home-hero-bg.png';
import HeroFg from '../../../images/home-hero-fg.png';
import Logo from '../../../images/logo without caption.png';
import LogoCaption from '../../../images/logo caption.png';

import { HeroContext } from '../../../context/hero_context';

export default function HomeHero() {
  const duration : number = 2;
  const delay : number = 1;

  const {heroRef, setHeroRef} = React.useContext(HeroContext);

  const ref = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      setHeroRef(ref);
    }
  }, [ref, setHeroRef]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], ["0", "-500vh"]);
  const logoCaptionY = useTransform(scrollYProgress, [0.2, 1], ["0", "-400vh"]);

  const springLogoY = useSpring(logoY, { stiffness: 400, damping: 90 });
  const springLogoCaptionY = useSpring(logoCaptionY, { stiffness: 400, damping: 90 });

  const logoOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const logoCaptionOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

  return (
    <div className='home-hero' ref={ref}>
      <motion.div
        className='logo-container'
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay,
          },
        }}
      >
        <motion.img
          src={Logo}
          id="hero-logo"
          alt="Team Logo"
          style={{
            y: springLogoY,
            opacity: logoOpacity,
          }}
        />
      </motion.div>
      <motion.div
        className='logo-caption-container'
        initial={{
          y: -100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration,
            delay: delay + 0.2,
          },
        }}
      >
        <motion.img
          src={LogoCaption}
          id="hero-logo-caption"
          alt="Team Logo Caption"
          style={{
            y: springLogoCaptionY,
            opacity: logoCaptionOpacity,
          }}
        />
      </motion.div>
      <img
        id="hero-placeholder"
        src={HeroBg}
        alt="Hero Background"
      />
      <img
        id="hero-bg"
        src={HeroBg}
        alt="Hero Background"
      />
      <img
        id="hero-fg"
        src={HeroFg}
        alt="Hero Foreground"
      />

        {/* <h1>Empowering communities through innovative water testing solutions.</h1>
        <p>
          Join us on our mission to provide clean water and monitoring solutions.
          Whether you're a community member, potential user, or industry partner, we
          welcome your collaboration and support.
        </p>
        <Link to="/contact" className="custom-button">Get Involved</Link> */}
    </div>
  )
}
