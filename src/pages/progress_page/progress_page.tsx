import React from 'react';
import './progress_page.css'

import progress_json from './progress_page.json';

import progress_img from '../../images/temp_progress.jpg';
import timeline_img_1 from '../../images/temp_timeline_1.jpg';
import timeline_img_2 from '../../images/temp_timeline_2.jpg';
import timeline_img_3 from '../../images/temp_timeline_3.jpg';


/**
 * @abstract A page consisting of information about the progress of the
 * organization.
 * 
 * @returns the progress page
 */
export default function ProgressPage() {
  const images: any[] = [timeline_img_1, timeline_img_2, timeline_img_3];

  return (
    <div className="progress-page">
      <div className="hero">
        <img src={progress_img} alt="Progress" />
        <h1>Our Progress</h1>
      </div>
      <div className='divider'></div>
      {
        progress_json.timeline.sort((a: any, b: any) => {
          return b.year - a.year;
        }).map((progress: any, index: number) => {
          return (
            <section className="events" key={index}>
              <div className="content">
                <h2>{progress.year}</h2>
                {
                  progress.events.map((event: any, index: number) => {
                    return (
                      <div className="event" key={index}>
                        <div className='text-container'>
                          <h3>{event.title}</h3>
                          <p className="description">{event.description}</p>
                        </div>
                        <div className="img-container">
                          {
                            event.imgIdx === -1 ? null : <img src={images[event.imgIdx]} alt={event.alt} />
                          }
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              <div className="timeline">
                <div className="line"></div>
                <div className="circle"></div>
                <div className="line"></div>
              </div>
            </section>
          );
        })
      }
    </div>
  );
}