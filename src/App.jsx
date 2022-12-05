import {  Routes, Route } from 'react-router-dom';
import { 
  Home, 
  Login,
  Register,
  Profile
 } from './pages/index';
import { Navigation, Footer } from './components';

// import React, { Suspense, lazy } from 'react';

// const Login = React.lazy(() => import("./pages/login/Login"));
// const Profile = React.lazy(() => import("./pages/profile/Profile"));
// const Register = React.lazy(() => import("./pages/register/Register"));
// const AboutUs = React.lazy(() => import("./pages/about-us/About-us" ));
// const Services = React.lazy(() => import("./pages/services/Services" ));
// const Contact = React.lazy(() => import("./pages/contact/Contact" ));
// const Home = React.lazy(() => import("./pages/home/Home" ));

const NotFound = () => {
  return <h1>Not Found</h1>
}

// const Spinner = () => {
//   return (
//     <div class="d-flex justify-content-center">
//       <div class="spinner-border" role="status">
//       </div>
//     </div>
//   )
// }

const App = () => {
  // const [token, setToken] = useState();

  // if(!token) {
  //   // return <Login setToken={setToken} />
  // }

  return (
    <>
      <Navigation/>
      {/* <Suspense fallback= { <Spinner/> } > */}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/user/profile" element={<Profile/>}/>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
      <Footer/>
      {/* </Suspense> */}
    </>
  );
}

export default App;
