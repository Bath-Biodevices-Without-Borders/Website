import { useContext, useEffect, useRef } from 'react';
import './contact_page.css';

import { HeroContext } from '../../context/hero_context';

export default function ContactPage() {
  const { setHeroRef } = useContext(HeroContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      setHeroRef(ref);
    }
  }, [ref, setHeroRef]);
  
  return (
    <div className="contact-page">
      <div className="hero" ref={ref}>
        <h1>
          Get in touch
        </h1>
      </div>
      <div className='form-container'>
        <h2>Contact Us</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={4 as number} required></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
