import React from 'react';
import {Link} from 'react-router-dom'
import './card.css';

export function Card ({character}) {
    const{name, urlImage,url, id, weight, temperament}=character
   
   let weightMin
   let weightMax
   if(weight&&typeof weight==='object'){
    weightMin= weight.min
    weightMax= weight.max
   }
   return (
      <div className='card' >
            <Link to={`/detail/${id}`}>
                <div className="image-container">
                    <img className="card-image" src={urlImage&&urlImage||url&&url} alt="Breeds Dog"/>
                </div>
            </Link>
                <div >
                <Link to={`/detail/${id}`}>
                    <h2 className='card-title'>{name&&name}</h2>
                </Link>
                <h2 className='card-title'>{weight&&`${weightMin}-${weightMax} Kg`}</h2>
                <h2 className='card-description'>{temperament&&temperament.join(', ')}</h2>
                </div>
            
        </div>
   );
}

export default Card;