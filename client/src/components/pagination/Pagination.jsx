import React from 'react';
import Cards from '../cards/Cards.jsx';
import './pagination.css'; 
import {useState, useEffect} from 'react'
import FilterOrderButton from '../filterOrderButton/FilterOrderButton.jsx';
import {orderCards, filterCards, upDate } from '../../redux/actions.js';
import {useDispatch} from 'react-redux'

const Pagination = function ({characters, temperaments}) {
  
const [aux, setAux] = useState(false)
const dispatch=useDispatch()
const [currentPage, setCurrentPage] = useState(0);
const charactersPerPage = 8; 
const totalPages = Math.ceil(characters.length / charactersPerPage);
const startIdx = currentPage  * charactersPerPage;
const endIdx = startIdx + charactersPerPage;
const visibleCharacters = characters.slice(startIdx, endIdx);
  
  useEffect(()=>{
    dispatch(upDate()) 
  
  },[])

  function handlerOrder(){
    const order = []
    order.push(document.getElementById("orderBy").value)
    order.push(document.getElementById("orderDirection").value)
    dispatch(orderCards(order))
    setCurrentPage(0)
    setAux(!aux)
  }  
  function handlerFilter(){
    const origin=document.getElementById("originFilter").value
    const temperaments= document.getElementById("temperamentsFilter").value
    dispatch(filterCards(origin,temperaments))
    setCurrentPage(0)
    setAux(!aux)
  }
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1); 
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1); 
  };
  
  return (
    <>
    <div className="filterOrderButton-container">
      <FilterOrderButton temperaments={temperaments} handlerOrder={handlerOrder} handlerFilter={handlerFilter}/>
    </div>
    <div className="cards-container">
      <div className="div-buttom">
        {currentPage > 0 && (
          <button className="pagination-button" onClick={goToPrevPage}>
            Anterior
          </button>
        )}
        {currentPage < totalPages-1 && (
          <button className="pagination-button" onClick={goToNextPage}>
            Siguiente
          </button>
        )}
      </div>
      <Cards visibleCharacters={visibleCharacters}/>
      
    </div>
    </>
  );

};

export default Pagination;