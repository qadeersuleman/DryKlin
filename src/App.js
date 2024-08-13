import Index from './Dryklin/Index';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from 'react-router-dom';
import SignupForm from './Dryklin/SignupForm';
import SigninForm from './Dryklin/SigninForm';
import ContactUs from './Dryklin/ContactUs';
import AboutUs from './Dryklin/AboutUs';



function App() {
  return (
    <div className="App" >
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/signin" element={<SigninForm />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/aboutus" element={<AboutUs />} />
        </Routes>
      </div>
  );
}

export default App;
