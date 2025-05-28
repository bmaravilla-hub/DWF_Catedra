import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/logo.png';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
        <Link className="nav-link" to="/productos">Productos</Link>
          <img src={logo} alt="Logo" className="logo" />
          <span className="ms-2">Farmacia Don Bosco</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
