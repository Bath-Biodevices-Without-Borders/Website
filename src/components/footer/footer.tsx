import './footer.css';
import { NavLink } from 'react-router-dom';

import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className='footer'>
      <div>
        <h5>Contact Us</h5>
        <p>Email: info@example.com</p>
      </div>
      <div>
        <h5>Quick Links</h5>
        <NavLink to = "/about">About Us</NavLink>
        <NavLink to= "/contact">Contact Us</NavLink>
      </div>
      <div>
        <h5>Follow Us</h5>
        <a
          href="https://www.instagram.com/teambathbiodevicesuk/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a
          href="https://www.linkedin.com/company/team-bath-biodevices-without-borders/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <div>
        <h5>Legal</h5>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
}
