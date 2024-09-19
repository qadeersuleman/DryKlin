import Homepage from "./Homepage"
import ImageGrid from "./ImageGrid"
import PriceCalculator from "./PriceCalculator"
import DryKlinLanding from "./DryKlinLanding"
import GetInTouch from "./GetInTouch"
import Footer from "./Footer"
import Testimonials from "./Testimonials"
import CustomNavbar from "./Authentication/CustomNavbar"
import Faq from "./Faq"
import BottomNav from "./Authentication/BottomNav"

const Index = () => {
    
    return (
        <div>

            <CustomNavbar />
            <BottomNav />
            <Homepage />
            <ImageGrid />
            <PriceCalculator />
            <Testimonials />

            <DryKlinLanding />
           <Faq />
            <GetInTouch />
            <Footer />
            
        </div>
    )
}

export default Index;