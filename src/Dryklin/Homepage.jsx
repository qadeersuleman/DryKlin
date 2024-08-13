import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Button, Image } from 'react-bootstrap';
import { Link , Route, Routes ,Outlet} from 'react-router-dom';
import SignupForm from './SignupForm';
import Page404 from './Page404';
function Homepage() {
  const [showclothes, Setshowclothes] = useState(false)
  useEffect(() => {
    const timer = setTimeout(()=>{
      Setshowclothes(true)
    }, 2000)

    return () => clearTimeout(timer) 
  }, [])
  
  return (
    <div className="homepage">
      <header className="header">
        <div className="top-bar">
          <span>helpdesk@dryklin.com</span>
          <span>234 700 000 9274</span>
          <span>Customer Support</span>
        </div>
        <nav className="nav">
          
            <Image src="/Dryklin/PNGS/12.png" alt="DryKlin Logo" className='imge' />
          
          <ul className='mt-2'>
            <li><Link to="/" className='nav-item'> Home</Link></li>
            <li><Link to="/aboutus" className='nav-item'> About Us</Link></li>
            <li><Link to="/contactus" className='nav-item'> Contact Us</Link></li>
          </ul>
          
          <div className="auth-buttons">
            <Link to="/signup" className=''>
            
            <Button className='logins-btn btn btn-outline-danger py-3 home-btns'><i className='fas fa-user px-1'></i>Log in</Button>
            </Link>
            
            <Button className="btn get-started-btn px-3 home-btns resp-btn">Get started <i className='fas fa-arrow-right resp-btn'></i></Button>
          </div>
        </nav>
      </header>

      <main className="main-content container">
        <div className="badge">NO1 LAUNDARY SERVICE BRAND ⭐</div>
        <h2>We make your</h2> <h2>clothes feel 
          {
            showclothes && (
              <span className="brand-new">brand new.</span>
            )
          }
          
          </h2>
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
