import Index from './Dryklin/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import SignupFormes from './Dryklin/SignupFormes';
import SigninFormes from './Dryklin/SigninFormes';
import ContactUs from './Dryklin/ContactUs';
import AboutUs from './Dryklin/AboutUs';

import UserForm from './simple';
import PriceCalculator from './Dryklin/PriceCalculator';
import Address from './Dryklin/Address/Address';
import Wallet from './Dryklin/Address/Wallet'
import EmailVerification from "./Dryklin/EmailVerification"
import ForgotPassword from './Dryklin/ForgotPassword';
import Forget from './Dryklin/Forget';
import Page404 from "./Dryklin/Page404"
import BillingModal from './Dryklin/BillingModal';


function App() {
  return (
    <div className="App" >
        
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupFormes />} />
          <Route path="/signin" element={<SigninFormes />} />
          <Route path="/forgetpass" element={<ForgotPassword />} />
          <Route path="/emails" element={<EmailVerification />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path='/pricelist' element={<PriceCalculator />} />
          <Route path='/address' element={<Address/>} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/paynow" element={<BillingModal />} />
          <Route path='*' element={<Page404 /> } />
        </Routes>
      </div>
  );
}

export default App;
