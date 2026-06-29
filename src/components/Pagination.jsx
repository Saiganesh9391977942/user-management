// Pagination component — page size selector and page navigation controls
// TODO: implement full UI

import { PAGE_SIZE_OPTIONS } from '../utils/constants';

const Pagination = ({ currentPage, totalPages, pageSize, totalItems, onPageChange, onPageSizeChange }) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div>
      <span>
        Showing {startItem}–{endItem} of {totalItems} users
      </span>

      <div>
        <label>Rows per page:</label>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={() => onPageChange(1)} disabled={currentPage === 1}>«</button>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>‹</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>›</button>
        <button onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>»</button>
      </div>
    </div>
  );
};

export default Pagination;
