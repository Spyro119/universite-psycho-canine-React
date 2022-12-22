import './Home.css';
import { Contact, Services, AboutUs } from '../../components/index';
import Image from '../../assets/desktop-1680x1050.jpg';

const Home = () => {
  return (
    <>
    {/* <img src={Image} className="main-image" alt="Home" /> */}
    <div>
      <p> small Home description </p>
    </div>
    <AboutUs/>
    <Services/>
    <Contact/>
    </>
  )
}

export default Home;
