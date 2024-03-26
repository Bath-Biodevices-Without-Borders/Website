import './about_page.css';
import OurStory from './our_story/our_story';

import TeamList from './team_profiles/team_list';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="card-category">
        About Us
      </div>
      <OurStory />
      <TeamList />
    </div>
  );
}
