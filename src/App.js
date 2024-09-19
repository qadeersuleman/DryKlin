import Index from "./Dryklin/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes } from "react-router-dom";

// User Authentication
import SigninForm from "./Dryklin/Authentication/SigninForm";
import SignupForm from "./Dryklin/Authentication/SignupForm";
import EmailVerification from "./Dryklin/Authentication/EmailVerification";
import ForgotPassword from "./Dryklin/Authentication/ForgotPassword";

import ContactUs from "./Dryklin/ContactUs";
import AboutUs from "./Dryklin/AboutUs";

import PriceCalculator from "./Dryklin/PriceCalculator";
import Address from "./Dryklin/Address/Address";
import Wallet from "./Dryklin/Address/Wallet";

import Page404 from "./Dryklin/Page404";
import BillingModal from "./Dryklin/BillingModal";
import TermsAndConditions from "./Dryklin/TermsAndConditions";
import CustomCare from "./Dryklin/CustomerCare";
import PrivacyPolicy from "./Dryklin/PrivacyPolicy";
import Faq from "./Dryklin/Faq";
import Profile from "./Dryklin/Address/Profile";

import ImageUpload from "./Dryklin/New/ImageUpload";
import ImageViewer from "./Dryklin/New/ImageViewer";

import PaymentSuccess from "./Dryklin/Address/PaymentSuccess";

import Loader from "./Dryklin/Authentication/Loader";

function App() {
  return (
    <div>
      {/* <AddToWallet />  */}

      <Routes>
        <Route path="/view/:imageName" element={<ImageViewer />} />
        <Route
          path="/"
          element={
            <Loader>
              <Index />
            </Loader>
          }
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/forgetpass" element={<ForgotPassword />} />
        <Route path="/emails" element={<EmailVerification />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/pricelist" element={<PriceCalculator />} />
        <Route path="/address" element={<Address />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/paynow" element={<BillingModal />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/customcare" element={<CustomCare />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/imageupload" element={<ImageUpload />} />

        {/* Wnadoo */}

        <Route path="/payment-success" element={<PaymentSuccess />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
