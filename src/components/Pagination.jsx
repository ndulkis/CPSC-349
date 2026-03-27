function Pagination({ currentPage, totalPages, onPrev, onNext }) {
  return (
    <footer className="pagination">
      <button
        className="page-btn"
        disabled={currentPage <= 1}
        aria-label="Previous page"
        onClick={onPrev}
      >
        Previous
      </button>
      <span className="page-number">Page {currentPage}</span>
      <button
        className="page-btn"
        disabled={currentPage >= totalPages}
        aria-label="Next page"
        onClick={onNext}
      >
        Next
      </button>
    </footer>
  );
}

export default Pagination;
