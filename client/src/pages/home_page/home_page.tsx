import React from "react";
import { Link } from "react-router-dom";

import CustomButton from "../../components/custom_button/custom_button";

import './home_page.css';
import cover_img from '../../images/temp_cover_img.jpg';
import about_img from '../../images/temp_about_img.jpg';
import work_img from '../../images/temp_work_img.jpg';
import connected_img from '../../images/temp_connected_img.jpg';
import home_json from './home_page.json';

/**
 * @abstract The Home page of the website.
 * 
 * @returns the home page
 */
export default function HomePage() {
  const images = [about_img, work_img, connected_img];

  return (
    <div className="home-page">
      <section className="img-container">
        <img src={cover_img} alt="cover" />
        <h1>Lorem Ipsum</h1>
      </section>
      <div className="divider"></div>
      {
        home_json.sections.map((section, index) => {
          return (
            <section className="section" id={`section-${section.id}`}>
              <div className="img-container">
                <img src={images[section.img_idx]} alt={section.alt} />
              </div>
              <div className="text">
                <h2>{section.heading}</h2>
                <p>{section.text}</p>
                <div className="button-container">
                  <CustomButton lnIntFraction={index/home_json.sections.length}>
                    <Link className='link' to={section.link}>{section.button}</Link>
                  </CustomButton>
                </div>
              </div>
            </section>
          )
        })
      }
    </div>
  );
}