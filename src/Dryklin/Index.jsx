import Homepage from "./Homepage"
import ImageGrid from "./ImageGrid"
import PriceCalculator from "./PriceCalculator"
import DryKlinLanding from "./DryKlinLanding"
import GetInTouch from "./GetInTouch"
import Footer from "./Footer"
import Testimonials from "./Testimonials"
import CustomNavbar from "./CustomNavbar"
import Faq from "./Faq"


const Index = () => {
    return (
        <div>
            <CustomNavbar />
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