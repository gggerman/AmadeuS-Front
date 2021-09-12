import React, { useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { useState, useEffect } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { getByName } from "../../redux/actions/getByName";
import { Link } from "react-router-dom";
import { Autocomplete } from "@material-ui/lab";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./SearchBar.css";
import ProductCard from "../productcard/ProductCard";
import { numberWithCommas } from "../../utils";
import { useHistory } from "react-router";
import { setSearchBar } from "../../redux/actions/searchBar";
const { REACT_APP_SERVER } = process.env;

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
    cardResults: {
      display: "flex",
    },
  },
}));

function SearchBar() {
  const [val, setVal] = useState([]);
  const classes = useStyles();
  const search = useSelector(({ app }) => app.searchBar);
  const [name, setName] = useState(search);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);
  const history = useHistory();
  const input = useRef()

  function handleSubmit(e) {
    e.preventDefault();
    history.push("/products");
    dispatch(setSearchBar(name));
    dispatch(getByName(name));
    input.current.blur()
  }

  async function doSearch() {
    try {
      if (name.length > 0) {
        let response = await axios(
          `${REACT_APP_SERVER}/products?name=${name}`
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
    <div className="searchbox">
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
            inputRef={input}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 200)}
            onChange={handleChange}
          />
          {/* {name.length > 0 && focused && (
            <Box className={classes.searchBoxResults}>
            <div className="searchbox__results">
              {searchResults.length > 0 ? (
                searchResults.map((r) => (
                  <Card>
                    <Link
                      to={`/detail/${r._id}`}
                      style={{ textDecoration: "none", display: "flex" }}
                      onClick={() => setName("")}
                    >
                        <div
                          className="searchbox__result-image"
                          style={{
                            backgroundImage: `url(${
                              r.image ||
                              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAIVBMVEX19fXd3d3z8/Pq6urb29vi4uLx8fHt7e3n5+fk5OTf39/UY198AAACNElEQVR4nO3a4Y6rIBCGYRUE9P4veO0KijB022xSTOd9zj/Xk9AvMgjOMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgDualrGy+t6juhNXB7Sxofe4bmQVIxqt6z2w25jkhMbR9B7ZbcjzbMNMS3wroqX3yG7DtCJae4+sm+lqEFb8FNFU3qtCaAXyilVDSN7+J6Jx7j3+D2gWnkYkFzrK05OI1sV457wJ2avk9T9b1RHZOduTTcdd19qjOqK13GwEIro+QsJ7tPudbi5f8p3iWiSfe8zS0/bh4fYgRdQ6GRJOAJRGdG7oJx+CyaoSEe2Ot0GfZtZRmer3TJ0RpUVryfJIU6/avqmMKJ14XAqPjRlVR0kqI4qlp3xe4uVyVdMYUfzNVdVJ14koleZ6fd+nWnmurTGiPQlXH5HEha7ITmNETrz6sN9fFCOFEdl9yZeOIve/FGVcY0T7VSLK8BT9Sa5Fwqe0GAa1KO1h6xUtvnWzoqUkqs1Y7HmYiuw0RhR/c7UZW57e/tWqN6C4YTVWjKJ861YZUTouCpeM4gkJO/38McpWNXu0hFRbN50Rnb/arKPd/i3ulZu/l7Aby9uInMu+nAm9WUojanWjSQ1+WiOSMxL7+9RGJPXEyDfqjajqjnXSp1jlEW2z7fzG6OdWo5buiB4NRsGYsDQ61YnoNRoiEg7y36GiFbvZiE5Cp7KZ+g29hw4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIbhB3oYDvixwDtCAAAAAElFTkSuQmCC"
                            })`,
                          }}
                        ></div>
                      <CardContent>
                        <Typography component="h1" className={classes.price}>
                          $ {numberWithCommas(r.price)}
                        </Typography>
                        <Typography variant="body2" component="h3">
                          {r.name}
                        </Typography>
                      </CardContent>
                    </Link>
                    <Divider variant="middle" light />
                  </Card>
                ))
              ) : (
                <Card>
                  <Typography component="h1">
                    Ningún resultado coincide con la búsqueda
                  </Typography>
                </Card>
              )}
            </div> */}
          {/* )} */}
          {name.length > 0 && focused && (
            <div className="searchbox__results">
              {searchResults.length > 0 ? (
                searchResults.map((r) => (
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
                      <Typography variant="body2" component="h3">
                        {r.name}
                      </Typography>
                    </Link>
                  </div>
                ))
              ) : (
                <Card>
                  <Typography component="h1">
                    Ningún resultado coincide con la búsqueda
                  </Typography>
                </Card>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
