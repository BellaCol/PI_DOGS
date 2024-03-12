import React, { useState } from 'react';
import FilterOrderButton from '../filterOrderButton/FilterOrderButton.jsx';
import { orderCards, filterCards } from '../../redux/actions.js';
import { useDispatch } from 'react-redux';
import Cards from '../cards/Cards.jsx';
import './pagination.css';

const Pagination = ({ characters, temperaments }) => {
  const [aux, setAux] = useState(false)
  const [currentPage, setCurrentPage] = useState(0);
  const charactersPerPage = 8;
  const totalPages = Math.ceil(characters.length / charactersPerPage);

  const dispatch = useDispatch();

  const handlerOrder = () => {
    const order = [
      document.getElementById("orderBy").value,
      document.getElementById("orderDirection").value
    ];
    dispatch(orderCards(order));
    setCurrentPage(0);
    setAux(!aux)
  };

  const handlerFilter = () => {
    const origin = document.getElementById("originFilter").value;
    const temperaments = document.getElementById("temperamentsFilter").value;
    dispatch(filterCards(origin, temperaments));
    setCurrentPage(0);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = Math.floor(currentPage / 10) * 10;
  const endIndex = Math.min(startIndex + 9, totalPages - 1);

  const paginationLinks = [];
  for (let i = startIndex; i <= endIndex; i++) {
    paginationLinks.push(
      <a
        key={i}
        className={`pagination-link ${i === currentPage ? 'active' : ''}`}
        onClick={() => goToPage(i)}
      >
        {i + 1}
      </a>
    );
  }

  const startIdx = currentPage * charactersPerPage;
  const endIdx = Math.min(startIdx + charactersPerPage, characters.length);
  const visibleCharacters = characters.slice(startIdx, endIdx);

  return (
    <>
      <div className="filterOrderButton-container">
        <FilterOrderButton temperaments={temperaments} handlerOrder={handlerOrder} handlerFilter={handlerFilter}/>
      </div>
      <div className="cards-container">
        <div className="pagination-buttons">
          {currentPage > 0 && (
            <a className="pagination-link" onClick={goToPrevPage}>
              Anterior
            </a>
          )}
          {paginationLinks}
          {currentPage < totalPages - 1 && (
            <a className="pagination-link" onClick={goToNextPage}>
              Siguiente
            </a>
          )}
        </div>
        <Cards visibleCharacters={visibleCharacters}/>
      </div>
    </>
  );
};

export default Pagination;