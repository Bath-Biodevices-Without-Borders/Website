import { useContext, useEffect, useRef } from 'react';
import './about_page.css';

import OurStory from './our_story/our_story';
import TeamList from './team_profiles';
import Hero from '../../components/hero/hero';

import { HeroContext } from '../../context/hero_context';

export default function AboutPage() {
  const { setHeroRef } = useContext(HeroContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeroRef(ref);
    }
  }, [ref, setHeroRef]);

  return (
    <div className="about-page">
      <Hero useParallax={false} imageUrl={'https://images.unsplash.com/photo-1548705085-101177834f47?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}>
        <h1>About Us</h1>
      </Hero>
      <OurStory />
      <TeamList />
    </div>
  );
}
