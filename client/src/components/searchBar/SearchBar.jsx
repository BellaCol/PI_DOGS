import './searchBar.css'; 
import { useState } from "react";
import {useLocation } from 'react-router-dom'
import { getBreed } from "../../redux/actions";
import {useDispatch} from 'react-redux'

const SearchBar = function () {
   const dispatch=useDispatch()
   const [name, setName]= useState("")
   const location=useLocation()

   if(location.pathname==='/home'){
      function handleChange(e){
         setName(e.target.value)
      }
      async function handleClick(){
         dispatch(getBreed(name))
         setName("")
      }
      return (
         <div>
            <input id='inputSearch' className='inputSearch' value={name} type='text' onChange={handleChange} placeholder="search breed"/>
            <button id='buttonSearch'className='searchButton' onClick={handleClick}>Buscar</button> 
         </div>
      );
   }
    
   return 
}
export default SearchBar