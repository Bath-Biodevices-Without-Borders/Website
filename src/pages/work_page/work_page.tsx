import './work_page.css';

import DeviceRender from '../../images/Picture1.png';
import AppRender from '../../images/App_Safe.png';
import SouthAfrica from '../../images/stellenbosch-team.jpeg';
import Riga from '../../images/riga.jpg';


export default function OasisPage() {
  return (
    <div className="oasis-page">
    <div className="oasis-card-category"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(https://images.unsplash.com/photo-1519455953755-af066f52f1a6?q=80&w=2261&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
        backgroundPosition: '20% 45%'
        }}
    >
      Our Work
    </div>
    <div className="render-container">
      <div className="render-container-one">
        <h2>OASIS</h2>
        <p>A portable, rechargeable hand-held water tester that will test for six different qualities.
          The results will be delivered both locally on the device, and via a Bluetooth connected
          smartphone app. </p>
        <h3>We will test for:
          <div className="sensors-container">
            <div className="sensor-card"><p>pH</p></div>
            <div className="sensor-card"><p>Conductivity</p></div>
            <div className="sensor-card"><p>Turbidity</p></div>
            <div className="sensor-card"><p>Nitrate</p></div>
            <div className="sensor-card"><p>Chloride</p></div>
            <div className="sensor-card"><p>Fluoride</p></div>
          </div>
        </h3>
      </div>
      <div className='render-container-two'>
      <img src={DeviceRender}
        alt="Unsplash"
        />
      </div>
    </div>
    <div className="oasis-card-product">
      <img src={AppRender}
      alt="Unsplash"
      />
      <div className="oasis-card-product-infos">
        <h2>The App</h2>
        <br></br>
        <ul className="fa-ul">
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>Transfers all readings to the App.</li>
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>View more in-depth details of readings.</li>
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>Readings uploaded to database for analysis.</li>
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>View nearby safe drinking water on map.</li>
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>Data control and privacy.</li>
          <li><span className="fa-li"><i className="fa-solid fa-caret-right"></i></span>News updates.</li>
          ​</ul>
      </div>
    </div>
    <div className='outreach'>
      <h2>Outreach</h2>
      <div className='south-africa-container'>
        <div>
          <h3>Stellenbosch, South Africa</h3>
          <p>This summer, members of the team travelled to Stellenbosch, South Africa, to test
            the prototype developed over the course of the year.
            Due to this trip being the team's first contact with Stellenbosch University and the
            device being early in its design process, it was decided that the main objective was
            to establish a strong relationship with the professionals in the area.
            Vital information on the target user was gained giving greater detail and
            revisions to the design specification. While the research team at Stellenbosch is
            agriscience orientated it was invaluable to experience the local area.
          </p>
        </div>
        <div>
          <img src={SouthAfrica} alt="south africa" />
        </div>
      </div>
      <div className='south-africa-container'>
      <div>
          <h3>Riga, Latvia</h3>
          <p>From October 5th to October 7th, 2023, a dedicated sub-team consisting of Melissa,
            Alexz, and Alexa had the opportunity to participate in the International
            Vertically Integrated Projects (VIP) Student Assembly. This exclusive two-day conference
            served as a gathering for members actively engaged in Vertically Integrated Projects,
            offering a dynamic platform for knowledge exchange, skill development, and collaborative
            networking. Throughout the event, attendees had the chance to immerse themselves in
            insightful workshops and engaging presentations, fostering a learning environment.

          </p>
        </div>
        <div>
          <img src={Riga} alt="riga" />
        </div>


      </div>
    </div>
  </div>
);
}
