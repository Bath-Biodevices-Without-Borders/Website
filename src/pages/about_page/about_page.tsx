import { useContext, useEffect, useRef } from 'react';
import './about_page.css';

import OurStory from './our_story/our_story';
import TeamList from './team_profiles';

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
      <div className="hero" ref={ref}>
        About Us
      </div>
      <OurStory />
      <TeamList />
    </div>
  );
}
