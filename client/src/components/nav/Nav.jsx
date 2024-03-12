import './nav.css'; 
import React from 'react'
import SearchBar from '../searchBar/SearchBar.jsx'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { upDate } from '../../redux/actions.js';

const Nav= function(){
    const dispatch=useDispatch()
    const location=useLocation()
    if(location.pathname==='/'){
       return 
    }

    function handleClick(){
        dispatch(upDate())
    }
    
    return(
    <div>
        <SearchBar  />
        <Link className='link' to="/"  >
            Inicio
        </Link>
        <Link className='link' to="/home" /*onClick={handleClick}*/>
            Home
        </Link>    
        <Link className='link' to="/form">
            Registrar Raza
        </Link>
        {location.pathname==='/home'&&<Link className='link' to="/home" onClick={handleClick}>
            Reiniciar Filtros
        </Link>}
       
        
    </div>
    )
}

export default Nav