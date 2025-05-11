import React, { useState, useEffect} from "react";



function SearchBox({ value, setFiltered }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropDownVisible, setDropDownVisible] = useState(false);
  const [selectOptions, setSelectOptions] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  const allOptions = value.map((todo) => todo.text)
  
//   console.log(searchTerm);

  //   const filteredOptions = allOptions
  //     .filter(function (option) {
  //       return option.toLowerCase().includes(searchTerm.toLowerCase());
  //     })
  //     .sort((a, b) => {
  //       return b.localeCompare(a);
  //     })
  //     .map(function (op, index) {
  //       return [index,op];
  //     });

  //   return console.log(filteredOptions);

//   const filteredOptions = allOptions.filter((option) => 
//     option.toLowerCase().startsWith(searchTerm.toLowerCase())
//   );
    
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
            setDropDownVisible(true);
        }, 500);

        return () => clearTimeout(handler);
    },[searchTerm]);
    
    useEffect(() => {
      if (debouncedSearchTerm.trim() === "") {
        setFiltered([]); // reset filter
      } else {
        const filtered = value.filter((todo) =>
          todo.text.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        );
        setFiltered(filtered);
      }
    }, [debouncedSearchTerm, value, setFiltered]);
    const filteredOptions = allOptions.filter((option) => 
         option.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    console.log(debouncedSearchTerm) 
  const handleSelect = (option) => {
    setSelectOptions(option);
    setSearchTerm(option);
    setDropDownVisible(false);
  };
  return (
    <div className="main">
      <input
        className="searchInput"
        type="text"
        value={searchTerm}
        placeholder="search..."
        onChange={(e) => {
          setSearchTerm(e.target.value);
        //   setDropDownVisible(true);
        }}
        onFocus={() => setDropDownVisible(true)}
      />
      {dropDownVisible && debouncedSearchTerm && (
        <ul className="dropdown">
          {filteredOptions.length === 0 ? (
            <li className="dropdown-item">No result found</li>
          ) : (
            filteredOptions.map((option, index) => (
              <li
                key={index}
                className="dropdown-item"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
