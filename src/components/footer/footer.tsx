import './footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-section">
        <h4>Contact Us</h4>
        <p>Email: info@example.com</p>
      </div>
      <div className="footer-section">
        <h4>Quick Links</h4>
        <a href="/about">About Us</a>
        <br />
        <a href="/contact">Contact Us</a>
      </div>
      <div className="footer-section">
        <h4>Follow Us</h4>
        <div className="footer-links">
          <a href="https://www.instagram.com/teambathbiodevicesuk/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.linkedin.com/company/team-bath-biodevices-without-borders/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
      <div className="footer-section">
        <h4>Legal</h4>
        <a href="/privacy">Privacy Policy</a>
        <br />
        <a href="/terms">Terms of Service</a>
      </div>
    </div>
  );
}
