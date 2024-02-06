import './home_page.css';
import { Link } from 'react-router-dom';

import AfricaMap from '../../images/map-redone-transformed.png';
import TeamPhoto from '../../images/team_pic_old-removebg.png';
import OasisImage from '../../images/OASIS_Device.png';


export default function HomePage() {
  return (
    <div className="main_container">
      <div
        className="home-card-category"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://images.unsplash.com/photo-1484318571209-661cf29a69c3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
            backgroundPosition: '20% 10%'
          }}
      >
        <h1>Empowering communities through innovative water testing solutions.</h1>
        <p>Join us on our mission to provide clean water and monitoring solutions.
          Whether you're a community member, potential user, or industry partner, we
          welcome your collaboration and support.
        </p>
        <Link to="/contact" className="custom-button">Get Involved</Link>
      </div>
      <div className="issue-card">
        <div className="issue-part-one">
          <div className='container-one'>
            <h2>The Water Crisis</h2>
            <p>More than 783 million people worldwide currently lack access to clean and safe water,
              posing a severe threat to public health and well-being. The impact is particularly
              devastating in the developing world, where waterborne diseases emerge as a critical
              concern.</p>
          </div>
          <div className='container-two'>
            <div className='water-scarcity'><i className="fa-solid fa-person"></i>
              <i className="fa-solid fa-person" ></i>
              <i className="fa-solid fa-person" style= {{color: "#355DF2"}}></i>
              <p>1 in 3 Africans face water scarcity</p>
            </div>
            <div className='waterbourne-disease'>
              <div className='number'><p><strong>115</strong></p></div>
              <div className='text'><p>people in Africa die from waterbourne diseases every hour</p></div>
            </div>
            <div className='lack-access'>
              <div className='number'><p><strong>400</strong></p></div>
              <div className='text'><p> million sub-saharan Africans lack access to basic drinking water</p></div>
            </div>
          </div>
        </div>
        <div className="issue-part-two"><img className='africa-map' src={AfricaMap} alt="Africa Map" /></div>
      </div>
      <div className='our-mission'>
        <h2>Our Mission</h2>
        <div className='statement'>
          <h4>Our mission is to provide portable and reusable water-quality diagnostic
            devices for water-quality safety and inspection, focusing on communities suffering
            from intense water scarcity and stress.</h4>
        </div>
        <img src={TeamPhoto} alt="Team" />
      </div>
      <div className="our-solution">
        <div className="solution-container-one">
          <img src={OasisImage} alt="Oasis Device" />
        </div>
        <div className="solution-container-2">
          <div>
            <h2>Our Solution</h2>
            <p>Our Solution is to develop a compact, rechargeable handheld water analyzer capable of assessing six distinct qualities.
              The findings are conveniently displayed on the device and seamlessly transmitted to a
              Bluetooth-connected smartphone app.</p>
          </div>
          <div className="solution-table">
            <div className="solution-table-part-one">
              <div className="solution-card">
                <i className="fa-solid fa-shuffle"></i>
                <div className="solution-card-text">
                  <h4>Versatile</h4>
                </div>
              </div>
              <div className="solution-card">
                <i className="fa-brands fa-envira"></i>
                <div>
                  <h4>Environmental</h4>
                </div>
              </div>
              <div className= "solution-card">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <h4>Real Time Data</h4>
                </div>
              </div>
              <div className= "solution-card">
                <i className="fa-solid fa-briefcase"></i>
                <div>
                  <h4>Portable</h4>
                </div>
              </div>
            </div>
            <div className="solution-table-part-two">
              <div className= "solution-card">
                <i className="fa-solid fa-phone"></i>
                <div>
                  <h4>Aftermarket Support</h4>
                </div>
              </div>
              <div className= "solution-card">
                <i className="fa-solid fa-screwdriver-wrench"></i>
                <div>
                  <h4>Low Maintenance</h4>
                </div>
              </div>
              <div className= "solution-card">
                <i className="fa-solid fa-dollar-sign"></i>
                <div>
                  <h4>Cost Effective</h4>
                </div>
              </div>
              <div className= "solution-card">
                <i className="fa-solid fa-bolt"></i>
                <div>
                  <h4>Low Power</h4>
                </div>
              </div>
            </div>
          </div>
          <Link to="/oasis" className="custom-button-solu">Our Work</Link>
        </div>
      </div>
    </div>

  );
}
