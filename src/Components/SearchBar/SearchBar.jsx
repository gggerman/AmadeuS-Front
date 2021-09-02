import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useState, useEffect } from "react";

function SearchBar() {
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    alert("XD");
  }

  async function doSearch() {
    if (name.length > 0) {
      let response = await fetch(`?name=${name}`);
      if (response.status === 200) {
        setSearchResults(await response.json());
      }
    } else {
      setSearchResults([]);
    }
  }

  function handleChange(e) {
    setName(e.target.value);
  }

  useEffect(() => {
    doSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <TextField
          type="text"
          id="input-with-icon-textfield"
          onChange={(e) => handleChange(e)}
          value={name}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
