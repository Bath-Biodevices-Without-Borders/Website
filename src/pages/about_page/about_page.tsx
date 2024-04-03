import './about_page.css';
import OurStory from './our_story/our_story';

import TeamList from './team_profiles';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="hero">
        About Us
      </div>
      <OurStory />
      <TeamList />
    </div>
  );
}
