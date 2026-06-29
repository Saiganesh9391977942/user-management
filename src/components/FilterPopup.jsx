// FilterPopup component — multi-criteria filtering modal popup
// TODO: implement full UI

import { DEPARTMENTS } from '../utils/constants';

const FilterPopup = ({ isOpen, filters, onFilterChange, onApply, onReset, onClose }) => {
  if (!isOpen) return null;

  return (
    <div>
      <h3>Filter Users</h3>
      <input
        placeholder="First Name"
        value={filters.firstName}
        onChange={(e) => onFilterChange({ ...filters, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        value={filters.lastName}
        onChange={(e) => onFilterChange({ ...filters, lastName: e.target.value })}
      />
      <input
        placeholder="Email"
        value={filters.email}
        onChange={(e) => onFilterChange({ ...filters, email: e.target.value })}
      />
      <select
        value={filters.department}
        onChange={(e) => onFilterChange({ ...filters, department: e.target.value })}
      >
        <option value="">All Departments</option>
        {DEPARTMENTS.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <button onClick={onReset}>Reset</button>
      <button onClick={onApply}>Apply</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default FilterPopup;
