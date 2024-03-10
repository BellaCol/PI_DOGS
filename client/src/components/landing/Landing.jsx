import React from 'react'
import './landing.css';
import { Link } from 'react-router-dom'


    const Landing= function(){

    return (
        <div className="landing-container">
            <h1 className="landing-title">Bienvenido a nuestra app de perros</h1>
            <p className="landing-description">Descubre una amplia variedad de razas de perros y encuentra tu compañero perfecto.</p>
            <div className="button-container">
                <Link to="/home">
                    <button className="landing-button">Home</button>
                </Link>
                
                <p>Ingresa a home</p>
            </div>
        </div>
        );
  
}

export default Landing