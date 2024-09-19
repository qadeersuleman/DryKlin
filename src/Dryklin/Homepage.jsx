import React, { useEffect, useState } from 'react';
import './Homepage.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSpring, animated } from '@react-spring/web';  
import ModalFlowManager from "./Request/ModalFlowManager";
import ShowShape from './New/ShowShape';

function Homepage() {
  const [showclothes, Setshowclothes] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      Setshowclothes(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const springProps = useSpring({
    from: { transform: 'translateY(0px)' },
    to: { transform: 'translateY(50px)' },
    loop: { reverse: true },  
    config: { duration: 1500 }, 
  });

  return (
    <div className="homepage" style={{backgroundImage : "url(/back.jpg"}}>
      <main className="main-content container">
        <div className="badge" style={{fontSize : "20px", marginBottom : "20px"}}>No1 LAUNDRY SERVICE BRAND ⭐</div>

        <div className="heading-container">
          <animated.img
            src="/front-imges.png"
            alt="left-image"
            className="left-image"
            style={springProps}
          />
          <h2 style={{fontSize : "50px"}} className="h2-data">We make your</h2>
          <animated.p 
            className="right-image"
            style={{...springProps, fontSize: '30px'}}
          >🥰</animated.p>
        </div>

        <h2 style={{fontSize : "50px"}} className='h2-data'> 
          clothes feel{' '}
          {showclothes && (
            <span className="brand-new">brand new.</span>
          )}
        </h2>

        <p style={{fontSize : "20px"}} className='package'>
          Pickup - Wash - Iron - Package - Deliver <br />
          All within 24 hours!!!
        </p>

        <div className="cta-buttons" style={{marginTop : "80px"}}>
          <animated.img src="/machines.png"
            alt="third-image"
            className="third-image"
            style={springProps}
          />
          <animated.img src="/irons.png"
            alt="right-image"
            className="right-image ilzam"
            style={springProps}
          />

          <ModalFlowManager />
          <Link to="/pricelist">
            <Button className="logines-btn px-2" style={{background : "none"}}>Check Price List</Button>
          </Link>
        </div>
      </main>
      {/* <ShowShape /> */}
    </div>
  );
}

export default Homepage;
