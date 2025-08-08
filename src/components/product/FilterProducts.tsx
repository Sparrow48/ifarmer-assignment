import React, { useState } from 'react';

const FilterProducts = () => {
  const [active, setActive] = useState('All');
  const [searchString, setSearchString] = useState('');
  const [category, setCategory] = useState(['All']);

  const filterByCategory = (key = '') => {
    setActive(key);
  };

  const search = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value);
  };

  return (
    <div>
      <div>
        <div className="w-full mb-0 md:mb-0">
          <input
            className="block w-full px-4 py-2 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-city"
            type="text"
            placeholder="Search"
            // onChange={searchByName}
          />
        </div>
      </div>
      <div className="pt-5 ">
        <div className="w-full px-3 py-2 font-bold bg-gray-200 rounded">
          <h1>Category</h1>
        </div>

        <ul className="flex flex-col items-start pt-3 pl-3">
          {category.sort().map((item) => (
            <button
              className={
                active === item ? 'pt-2  border-b-2  border-blue-500' : 'pt-2 '
              }
              key={item}
              onClick={() => filterByCategory(item)}
            >
              {item}
            </button>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterProducts;
