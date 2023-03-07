import React from 'react';

import './about_page.css';
import about_json from './about_page.json';

import HighlightBox from '../../components/highlight_box/highlight_box';

import imgPerson1 from '../../images/temp_person_1.jpg';
import imgPerson2 from '../../images/temp_person_2.jpg';
import imgPerson3 from '../../images/temp_person_3.jpg';
import imgPerson4 from '../../images/temp_person_4.jpg';

import { ITeam } from '../../types';

/**
 * @abstract A page consisting of information about the organization.
 * 
 * @returns the about page
 */
export default function AboutPage() {

  const profileImages: any[] = [imgPerson1, imgPerson2, imgPerson3, imgPerson4];

  return (
    <div className="about-page">
      <div className='hero'>
        <h1>About Us</h1>
        <HighlightBox cards={about_json.heroCards}/>
      </div>
      {
        about_json.teams.map((team: ITeam, index: number) => {
          return (
            <section key={index}>
              <div className='divider' id={team.id}></div>
              <h2>{team.name}</h2>
              <p>{team.text}</p>
              <div className='members'>
                {
                  team.members.map((member, index) => {
                    return(
                      <div key={index} className='member'>
                        <img src={profileImages[member.imgIdx]} alt={member.alt}/>
                        <h3>{member.name}</h3>
                        <h4>{member.title}</h4>
                        <p>{member.text}</p>
                      </div>
                    )
                  })
                }
              </div>
            </section>
          )
        })
      }
    </div>
  );
}