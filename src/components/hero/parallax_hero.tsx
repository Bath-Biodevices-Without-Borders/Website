import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import React, { useRef } from 'react'

export default function ParallaxHero({
  foregroundImage: fgImage,
  backgroundImage: bgImage,
  foregroundElement: fgElement,
  backgroundElement: bgElement,
  duration = 2,
  delay = 1,
} : {
  foregroundImage: string | undefined;
  backgroundImage: string | undefined;
  foregroundElement: JSX.Element | undefined;
  backgroundElement: JSX.Element | undefined;
  duration: number | undefined;
  delay: number | undefined;
}
) {

  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0", "-500vh"]);
  const fgY = useTransform(scrollYProgress, [0.2, 1], ["0", "-400vh"]);

  const bgYSpring = useSpring(bgY, { stiffness: 400, damping: 90 });
  const fgYSping = useSpring(fgY, { stiffness: 400, damping: 90 });

  const bgOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);
  const fgOpacity = useTransform(scrollYProgress, [0.2, 0.5], [1, 0]);

  return (
    <div className='parallax-hero' ref={ref}>
      <motion.div
        className='bg-container'
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
        <motion.div
          className='fg-content-container'
          style={{
            y: bgYSpring,
            opacity: bgOpacity,
          }}
        >
          {
            bgElement
          }
        </motion.div>
      </motion.div>
      <motion.div
        className='fg-container'
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
        <motion.div
          className='fg-content-container'
          style={{
            y: fgYSping,
            opacity: fgOpacity,
          }}
        >
          {
            fgElement
          }
        </motion.div>
      </motion.div>
      <img
        id="hero-placeholder"
        src={bgImage}
        alt="Hero Background"
      />
      <img
        id="hero-bg"
        src={bgImage}
        alt="Hero Background"
      />
      <img
        id="hero-fg"
        src={fgImage}
        alt="Hero Foreground"
      />
    </div>
  )
}
