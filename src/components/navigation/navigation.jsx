import { Outlet } from 'react-router-dom';
import './navigation.css';
import logo from '../../assets/universitepsychocaninelogo.jpg'
import { NavDropdown, Navbar, Nav, Container } from 'react-bootstrap';
import { useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { actionCreators } from '../../redux/index';
import useToken from '../../utils/token';


const Navigation = () => {
  const [_eventKey, set_eventKey] = useState(window.location.hash ? window.location.hash : window.location.pathname);
  const { token } = useToken();

  return (
    <>
      <Navbar sticky="top" bg="dark" variant="dark" >
        <Container className="nav-Container">
          <Navbar.Brand href="/"><img src={logo} alt="site logo"  className="nav-logo"/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" activeKey={ _eventKey }>
            <Nav.Item>
            <Nav.Link href="/" eventKey="/">Home</Nav.Link>
            </Nav.Item>
              <Nav.Link href={"/#about-us"} eventKey="#about-us" onClick={()=> set_eventKey("#about-us")}>About us</Nav.Link>
              <Nav.Link href={"/#services"} eventKey="#services" onClick={()=> set_eventKey("#services")}>Services</Nav.Link>
              <Nav.Link href={"/#contact"} eventKey="#contact" onClick={()=> set_eventKey("#contact")} >Contact us</Nav.Link>
              <div className="account dropdown">
              </div>
            </Nav>
            <Nav className="account">
            { token ? 
            <NavDropdown title="My profile" id="basic-nav-dropdown ">
                <NavDropdown.Item href={"/user/profile"}>Edit Profile</NavDropdown.Item>
                <NavDropdown.Item href={"/user/profile#my-pets"}>My pets</NavDropdown.Item>
                <NavDropdown.Item href={"/"} onClick={() => localStorage.clear()} eventKey="/">Log out</NavDropdown.Item>
            </NavDropdown> : 
            <Nav className="me-auto account" activeKey={ window.location.pathname }>
              <Nav.Link href={"/login"} eventKey="/login">Login</Nav.Link>
              <Nav.Link href={"/register"} eventKey="/register">Sign in</Nav.Link>
            </Nav>
            }
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Outlet/>
      </Navbar>
    </>
  )
}

export default Navigation;