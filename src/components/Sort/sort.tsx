import React from 'react';

type SortProps = {
  onSortChange: (sort: string) => void;
};

const Sort: React.FC<SortProps> = ({ onSortChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="sort">
      <label htmlFor="sort">Sort By:</label>
      <select id="sort" onChange={handleChange}>
        <option value="">None</option>
        <option value="title.keyword">Title</option>
        <option value="timestamp">Date</option>
      </select>
    </div>
  );
};

export default Sort;
