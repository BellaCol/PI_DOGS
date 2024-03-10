import axios from "axios"
import { useState, useEffect } from "react"
import {useParams} from 'react-router-dom'
import './detail.css';

const Detail= function(){
  const{id}=useParams()
  const [character, setCharacter]= useState([]) 
    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios(`/dogs/${id}`);
            setCharacter(data);
          } catch (error) {
            console.error('Error fetching data:', error.message);
          }
        };
                
        fetchData();
      }, [id]);
  
    const{urlImage,name,height,weight,life_span,temperament}=character
 
    return(
  
    <div className="detail-container">
       <img className="detail-image" src={urlImage&&urlImage} alt = 'Breds Dog'/> 
         <div className="detail-description">
            <h1 className='detail-title'>{id}</h1>
            <h2 className='detail-title'>Nombre: {name&&name}</h2>
            <h2 className='detail-weight'>Peso: {weight&&weight} Kg</h2>
            <h2 className='detail-height'>Altura: {height&&height} Cm</h2>
            <h2 className='detail-life_span'>Años de Vida: {life_span&&life_span}</h2>
            <h2 className='detail-temperament'>Temperamento: {temperament&&temperament.join(',')}</h2>
         </div>
    </div>
    
    )
}

export default Detail