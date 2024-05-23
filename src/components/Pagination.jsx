const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const maxButtons = 5; // Maximum number of buttons to display
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(currentPage - half, 1);
    let end = Math.min(currentPage + half, totalPages);

    if (currentPage <= half) {
      end = Math.min(maxButtons, totalPages);
    }
    if (currentPage + half >= totalPages) {
      start = Math.max(totalPages - maxButtons + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center my-4 space-x-2">
      <button
        className={`px-3 py-1 bg-gray-300 rounded ${
          currentPage === 1 ? "hidden" : "block"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {pageNumbers[0] > 1 && (
        <>
          <button
            className={`px-3 py-1 ${currentPage === 1 ? "font-bold" : ""}`}
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="px-3 py-1">...</span>}
        </>
      )}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`px-3 py-1 ${currentPage === number ? "font-bold" : ""}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="px-3 py-1">...</span>
          )}
          <button
            className={`px-3 py-1 ${
              currentPage === totalPages ? "font-bold" : ""
            }`}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      <button
        className="px-3 py-1 bg-gray-300 rounded"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
