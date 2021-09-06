import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getByName } from "../../redux/actions/getByName";
import { Link } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import { Grid, TextField } from "@material-ui/core";
import { useDispatch } from "react-redux";
import "./SearchBar.css";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(7),
    width: "80vh",
    maxHeight: "6vh",
  },
  searchIcon: {
    color: theme.palette.primary.contrastText,
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
  const [val, setVal] = useState([]);
  const classes = useStyles();
  const [name, setName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getByName(name));
    setName("");
  }

  async function doSearch() {
    try {
      if (name.length > 0) {
        let response = await axios(
          `http://localhost:3001/products?name=${name}`
        );
        console.log(response.status);
        if (response.status === 200) {
          setSearchResults(await response.data);
        }
      }
    } catch (err) {
      setSearchResults([]);
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    doSearch();
  }, [name]);

  return (
    <div className='searchbox'>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
            value={name}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onChange={handleChange}
          />
          {name.length > 0 && <Grid></Grid>}
          {name.length > 0 && focused && (
            <div className="searchbox__results">
              {searchResults.length > 0
                ? searchResults.map((r) => (
                    <div key={r.id} className="searchbox__result">
                      <Link to={`/detail/${r._id}`} onClick={() => setName("")}>
                        <div
                          className="searchbox__result-image"
                          style={{
                            backgroundImage: `url(${
                              r.image ||
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAIVBMVEX19fXd3d3z8/Pq6urb29vi4uLx8fHt7e3n5+fk5OTf39/UY198AAACNElEQVR4nO3a4Y6rIBCGYRUE9P4veO0KijB022xSTOd9zj/Xk9AvMgjOMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgDualrGy+t6juhNXB7Sxofe4bmQVIxqt6z2w25jkhMbR9B7ZbcjzbMNMS3wroqX3yG7DtCJae4+sm+lqEFb8FNFU3qtCaAXyilVDSN7+J6Jx7j3+D2gWnkYkFzrK05OI1sV457wJ2avk9T9b1RHZOduTTcdd19qjOqK13GwEIro+QsJ7tPudbi5f8p3iWiSfe8zS0/bh4fYgRdQ6GRJOAJRGdG7oJx+CyaoSEe2Ot0GfZtZRmer3TJ0RpUVryfJIU6/avqmMKJ14XAqPjRlVR0kqI4qlp3xe4uVyVdMYUfzNVdVJ14koleZ6fd+nWnmurTGiPQlXH5HEha7ITmNETrz6sN9fFCOFEdl9yZeOIve/FGVcY0T7VSLK8BT9Sa5Fwqe0GAa1KO1h6xUtvnWzoqUkqs1Y7HmYiuw0RhR/c7UZW57e/tWqN6C4YTVWjKJ861YZUTouCpeM4gkJO/38McpWNXu0hFRbN50Rnb/arKPd/i3ulZu/l7Aby9uInMu+nAm9WUojanWjSQ1+WiOSMxL7+9RGJPXEyDfqjajqjnXSp1jlEW2z7fzG6OdWo5buiB4NRsGYsDQ61YnoNRoiEg7y36GiFbvZiE5Cp7KZ+g29hw4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIbhB3oYDvixwDtCAAAAAElFTkSuQmCC"
                            })`,
                          }}
                        ></div>
                        <div>{r.name}</div>
                      </Link>
                    </div>
                  ))
                : "No results"}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
