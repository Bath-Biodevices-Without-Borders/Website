import React from 'react'
import './tag.css'
import { Link } from 'react-router-dom'

export default function Tag() {
  return (
    <div className='tag-card'>
      <div className='wave-container'>
        <svg width="100%" height="100%" preserveAspectRatio='none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#030026" fill-opacity="1" d="M0,224L10.9,186.7C21.8,149,44,75,65,48C87.3,21,109,43,131,58.7C152.7,75,175,85,196,85.3C218.2,85,240,75,262,106.7C283.6,139,305,213,327,250.7C349.1,288,371,288,393,256C414.5,224,436,160,458,117.3C480,75,502,53,524,74.7C545.5,96,567,160,589,186.7C610.9,213,633,203,655,213.3C676.4,224,698,256,720,256C741.8,256,764,224,785,181.3C807.3,139,829,85,851,69.3C872.7,53,895,75,916,85.3C938.2,96,960,96,982,112C1003.6,128,1025,160,1047,176C1069.1,192,1091,192,1113,170.7C1134.5,149,1156,107,1178,128C1200,149,1222,235,1244,229.3C1265.5,224,1287,128,1309,80C1330.9,32,1353,32,1375,26.7C1396.4,21,1418,11,1429,5.3L1440,0L1440,320L1429.1,320C1418.2,320,1396,320,1375,320C1352.7,320,1331,320,1309,320C1287.3,320,1265,320,1244,320C1221.8,320,1200,320,1178,320C1156.4,320,1135,320,1113,320C1090.9,320,1069,320,1047,320C1025.5,320,1004,320,982,320C960,320,938,320,916,320C894.5,320,873,320,851,320C829.1,320,807,320,785,320C763.6,320,742,320,720,320C698.2,320,676,320,655,320C632.7,320,611,320,589,320C567.3,320,545,320,524,320C501.8,320,480,320,458,320C436.4,320,415,320,393,320C370.9,320,349,320,327,320C305.5,320,284,320,262,320C240,320,218,320,196,320C174.5,320,153,320,131,320C109.1,320,87,320,65,320C43.6,320,22,320,11,320L0,320Z"></path>
        </svg>
      </div>
      <div className='tag-content'>
        <h2>Empowering communities through innovative water testing solutions.</h2>
        <p>
          Join us on our mission to provide clean water and monitoring solutions.
          Whether you're a community member, potential user, or industry partner, we
          welcome your collaboration and support.
        </p>
        <Link to="/contact" className="custom-button">Get Involved</Link>
      </div>
    </div>
  )
}
