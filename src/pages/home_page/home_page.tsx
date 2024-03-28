import './home_page.css';
import { Link } from 'react-router-dom';

import AfricaMap from '../../images/map-redone-transformed.png';
import OasisImage from '../../images/OASIS_Device.png';

import {
  faPerson,
  faShuffle,
  faClock,
  faBriefcase,
  faPhone,
  faScrewdriverWrench,
  faDollarSign,
  faBolt
} from '@fortawesome/free-solid-svg-icons';
import { faEnvira } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Empowering communities through innovative water testing solutions.</h1>
        <p>
          Join us on our mission to provide clean water and monitoring solutions.
          Whether you're a community member, potential user, or industry partner, we
          welcome your collaboration and support.
        </p>
        <Link to="/contact" className="custom-button">Get Involved</Link>
      </div>
      <div className="issue-card">
        <aside>
          <main>
            <h2>The Water Crisis</h2>
            <p>
              More than 783 million people worldwide currently lack access to clean and safe water,
              posing a severe threat to public health and well-being. The impact is particularly
              devastating in the developing world, where waterborne diseases emerge as a critical
              concern.
            </p>
          </main>
          <section>
            <div className='icon-container'>
              <FontAwesomeIcon icon={faPerson} />
              <FontAwesomeIcon icon={faPerson} />
              <FontAwesomeIcon icon={faPerson} />
            </div>
            <p>
              1 in 3 Africans face water scarcity
            </p>
            <div className='icon-container'>115</div>
            <p>
              people in Africa die from waterbourne diseases every hour
            </p>
            <div className='icon-container'>400</div>
            <p>
              million sub-saharan Africans lack access to basic drinking water
            </p>
          </section>
        </aside>
        <figure>
          <img src={AfricaMap} alt="Africa Map"></img>
        </figure>
      </div>
      <div className='our-mission'>
        <h2>Our Mission</h2>
        <p>
          Our mission is to provide portable and reusable diagnostic devices for water-quality safety and inspection, 
          focusing on communities suffering from water scarcity and stress.
        </p>
      </div>
      <div className="our-solution">
        <aside>
          <main>
            <h2>Our Solution</h2>
            <p>
              Our Solution is to develop a compact, rechargeable handheld water analyzer capable of assessing six distinct qualities.
              The findings are conveniently displayed on the device and seamlessly transmitted to a
              Bluetooth-connected smartphone app.
            </p>
            <Link to="/work" className="custom-button">Our Work</Link>
          </main>
          <ul>
            <li>
              <figure>
                <FontAwesomeIcon icon={faShuffle} />
              </figure>
              <p>Versatile</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faEnvira} />
              </figure>
              <p>Environmental</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faClock} />
              </figure>
              <p>Real Time Data</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faBriefcase} />
              </figure>
              <p>Portable</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faPhone} />
              </figure>
              <p>Aftermarket Support</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faScrewdriverWrench} />
              </figure>
              <p>Low Maintenance</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faDollarSign} />
              </figure>
              <p>Cost Effective</p>
            </li>
            <li>
              <figure>
                <FontAwesomeIcon icon={faBolt} />
              </figure>
              <p>Low Power</p>
            </li>
          </ul>
        </aside>
        <figure>
          <img src={OasisImage} alt="Oasis Device" />
        </figure>
      </div>
    </div>

  );
}