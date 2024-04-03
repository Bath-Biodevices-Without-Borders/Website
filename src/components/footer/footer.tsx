import './footer.css';
import { NavLink } from 'react-router-dom';

import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className='footer'>
      <div>
        <h4>Contact Us</h4>
        <p>Email: info@example.com</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <NavLink to = "/about">About Us</NavLink>
        <NavLink to= "/contact">Contact Us</NavLink>
      </div>
      <div>
        <h4>Follow Us</h4>
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
        <h4>Legal</h4>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
}
