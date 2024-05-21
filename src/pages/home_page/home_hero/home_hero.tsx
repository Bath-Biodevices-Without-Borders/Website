import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion';
import './home_hero.css'

import HeroBg from '../../../images/home-page-hero-bg.jpg';
import HeroFg from '../../../images/home-page-hero-fg.png';
import Logo from '../../../images/logo without caption.png';
import LogoCaption from '../../../images/logo caption.png';

export default function HomeHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);
  const logoCaptionY = useTransform(scrollYProgress, [0, 1], ["0%", "-200%"]);

  return (
    <div className='home-hero' ref={ref}>
      <motion.img
        src={Logo}
        id="hero-logo"
        alt="Team Logo"
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            delay: 2,
          }
        }}
        style={{ y: logoY }}
      />
      <motion.img
        src={LogoCaption}
        id="hero-logo-caption"
        alt="Team Logo Caption"
        initial={{
          y: 100,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
            delay: 2,
          }
        }}
        style={{ y: logoCaptionY }}
      />
      {/* <div
        id="hero-bg"
        style={{
          backgroundImage: `url(/hero-page-hero-bg.jpg)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      />
      <div
        id="hero-fg"
        style={{
          backgroundImage: `url(/hero-page-hero-fg.png)`,
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      /> */}
      <img
        id="hero-bg"
        src={HeroBg}
        alt="Hero Background"
      />
      <motion.img
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
