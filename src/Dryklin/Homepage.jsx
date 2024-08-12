import React from 'react';
import './Homepage.css';
import { Button } from 'react-bootstrap';

function Homepage() {
  return (
    <div className="homepage">
      <header className="header">
        <div className="top-bar">
          <span>helpdesk@dryklin.com</span>
          <span>234 700 000 9274</span>
          <span>Customer Support</span>
        </div>
        <nav className="nav">
          
            <img src="/Dryklin/PNGS/12.png" alt="DryKlin Logo" className='imge' />
          
          <ul className='mt-2'>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact</li>
          </ul>
          <div className="auth-buttons">
            <Button className='logins-btn px-2'><i className='fas fa-user px-2'></i>Log in</Button>
            <Button className="get-started-btn px-3">Get started <i className='fas fa-arrow-right'></i></Button>
          </div>
        </nav>
      </header>

      <main className="main-content container">
        <h5 className='containes'>No. 1 LAUNDARY SERVICE BRAND</h5>
        <h2>We make your</h2> <h2>clothes feel <span className="brand-new">brand new.</span></h2>
        <p>Pickup - Wash - Iron - Package - Deliver <br /> All within 24 hours!!!</p>
        <div className="cta-buttons">
        <Button className="get-started-btn px-3">Request Pickup <i className='fas fa-arrow-right'></i></Button>
        <Button className='logins-btn px-2'>Check Price List</Button>
        </div>
      </main>
    </div>
  );
}

export default Homepage;
