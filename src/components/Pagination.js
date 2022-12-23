import React from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== totalPages) setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <button className="page-link" onClick={() => setCurrentPage(1)}>
            <i className="fa fa-angle-double-left" aria-hidden="true"></i>
          </button>
        </li>
        <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
          <button className="page-link" onClick={prevPage}>
            <i className="fa fa-angle-left" aria-hidden="true"></i>
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li
            key={pgNumber}
            className={`page-item ${currentPage === pgNumber ? "active" : ""} `}
          >
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className="page-link"
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage === totalPages ? "page-item disabled" : "page-item"
          }
        >
          <button className="page-link" onClick={nextPage}>
            <i className="fa fa-angle-right" aria-hidden="true"></i>
          </button>
        </li>
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => setCurrentPage(totalPages)}
          >
            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
