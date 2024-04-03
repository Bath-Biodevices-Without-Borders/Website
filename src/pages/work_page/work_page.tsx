import './work_page.css';

import DeviceRender from '../../images/Picture1.png';
import AppRender from '../../images/App_Safe.png';
import SouthAfrica from '../../images/stellenbosch-team.jpeg';
import Riga from '../../images/riga.jpg';

import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function OasisPage() {
  return (
    <div className="work-page">
      <div className="hero">
        <h1>
          Our Work
        </h1>
      </div>
    <div className="oasis">
      <aside>
        <h2>OASIS</h2>
        <p>
          A portable, rechargeable hand-held water tester that will test for six different qualities.
          The results will be delivered both locally on the device, and via a Bluetooth connected
          smartphone app.
        </p>
        <h3>We will test for:</h3>
        <ul>
          <li>pH</li>
          <li>Conductivity</li>
          <li>Turbidity</li>
          <li>Nitrate</li>
          <li>Chloride</li>
          <li>Fluoride</li>
        </ul>
      </aside>
      <figure className='render-container-two'>
        <img src={DeviceRender} alt="Unsplash" />
      </figure>
    </div>
    <div className="app">
      <figure>
        <img src={AppRender} alt="Unsplash" />
      </figure>
      <aside className="oasis-card-product-infos">
        <h2>The App</h2>
        <ul>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>Transfers all readings to the App.</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>View more in-depth details of readings.</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>Readings uploaded to database for analysis.</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>View nearby safe drinking water on map.</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>Data control and privacy.</p>
          </li>
          <li>
            <FontAwesomeIcon icon={faCaretRight} />
            <p>News updates.</p>
          </li>
        </ul>
      </aside>
    </div>
    <div className='outreach'>
      <h2>Outreach</h2>
      <ul>
        <li>
          <aside>
            <h3>Stellenbosch, South Africa</h3>
            <p>
              This summer, members of the team travelled to Stellenbosch, South Africa, to test
              the prototype developed over the course of the year.
              Due to this trip being the team's first contact with Stellenbosch University and the
              device being early in its design process, it was decided that the main objective was
              to establish a strong relationship with the professionals in the area.
              Vital information on the target user was gained giving greater detail and
              revisions to the design specification. While the research team at Stellenbosch is
              agriscience orientated it was invaluable to experience the local area.
            </p>
          </aside>
          <figure>
            <img src={SouthAfrica} alt="south africa" />
          </figure>
        </li>
        <li>
          <aside>
            <h3>Riga, Latvia</h3>
            <p>
              From October 5th to October 7th, 2023, a dedicated sub-team consisting of Melissa,
              Alexz, and Alexa had the opportunity to participate in the International
              Vertically Integrated Projects (VIP) Student Assembly. This exclusive two-day conference
              served as a gathering for members actively engaged in Vertically Integrated Projects,
              offering a dynamic platform for knowledge exchange, skill development, and collaborative
              networking. Throughout the event, attendees had the chance to immerse themselves in
              insightful workshops and engaging presentations, fostering a learning environment.
            </p>
          </aside>
          <figure>
            <img src={Riga} alt="riga" />
          </figure>
        </li>
      </ul>
    </div>
  </div>
);
}
