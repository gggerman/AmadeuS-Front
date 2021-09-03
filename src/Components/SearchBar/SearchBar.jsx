import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(7),
    width: "150%",
    maxHeight: "40px",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    alert(name);
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
          onChange={(e) => handleChange(e)}
          value={name}
          variant="outlined"
          placeholder="Search..."
          InputProps={{
            className: classes.search,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="white" />
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
