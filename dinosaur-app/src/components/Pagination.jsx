import React from "react";

export default function Pagination({ cardsPerPage, totalCards, paginate }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="container mt-4">
      <p className="d-flex justify-content-center">Page</p>
      <ul className="pagination d-flex flex-wrap justify-content-center">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => paginate(number)}
              href="#search-results"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
