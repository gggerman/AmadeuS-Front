import React, { useState, useEffect, useContext } from "react";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";

import { Pagination } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import ProductCard from "../productcard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import getAllProducts, {
  sortByName,
  sortByPrice,
  filterByCategory,
} from "../../redux/actions/getAllProducts";
import { getAllCategories } from "../../redux/actions/getAllCategories";
import { UserContext } from '../shoppingcart/UserContext';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginTop: "-8vh",
    minWidth: 130,
  },
  label: {
    fontSize: "12px",
  },
  gridContainer: {
    margin: "auto",
    maxWidth: "200vh",
  },
  root: {
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  
  },
}));

export default function Catalogue() {
    // const products = useSelector(({ app }) => app.productsLoaded);
    // const categories = useSelector(({ app }) => app.categoriesLoaded);
    // const dispatch = useDispatch();
    const {shoppingCart, setShoppingCart} = useContext( UserContext )
    const {cartQuantity} = shoppingCart

    
  const { data, loading, success } = useSelector(
    ({ app }) => app.productsLoaded
  );
  const categories = useSelector(({ app }) => app.categoriesLoaded);
  const search = useSelector(({ app }) => app.searchBar);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!search || search.length === 0) {
      dispatch(getAllProducts());
    }
    dispatch(getAllCategories());
    setShoppingCart( prev => ({
      ...prev,
      cartQuantity: JSON.parse(localStorage.getItem('cartItemsQuantity'))
  }))
  }, [dispatch]);

  // Para renderizar cuando hay ordenamientos y filtrado
  const [render, setRender] = useState("");
  // Controlador de los select's
  const [select, setSelect] = useState({
    name: "",
    price: "",
    filter: "",
  });

  // Control del paginado
  const [page, setPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(12);
  const indexLastProduct = page * productsPerPage;
  const indexFirstProduct = indexLastProduct - productsPerPage;
  const currentProducts = data.slice(indexFirstProduct, indexLastProduct);

  const classes = useStyles();

  function handleSortName(e) {
    dispatch(sortByName(e.target.value));
    setRender(`Sort ${e.target.value}`);
    setSelect({
      ...select,
      name: e.target.value,
    });
    setPage(1);
  }

  function handleSortPrice(e) {
    dispatch(sortByPrice(e.target.value));
    setRender(`Sort ${e.target.value}`);
    setSelect({
      ...select,
      price: e.target.value,
    });
    setPage(1);
  }

  function handleFilterCategory(e) {
    setSelect({
      ...select,
      filter: e.target.value,
    });
    setPage(1);
  }

  function handleChange(event, value) {
    setPage(value);
  }
  
  useEffect(() => {
    dispatch(filterByCategory(select.filter));
  }, [select.filter]);

  return (
    <div style={{marginTop:'3vh'}}>
      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}
      {!loading && success && (
        <>
          <Grid
            container
            direction="row"
            justifyContent="center"
            style={{ marginTop: "5vh" }}
          >
            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>
                Filtrar por Categoria
              </InputLabel>
              <Select
                value={select.filter}
                onChange={(e) => handleFilterCategory(e)}
              >
                <MenuItem value="All">Todos</MenuItem>
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Ordenar por Nombre</InputLabel>
              <Select value={select.name} onChange={(e) => handleSortName(e)}>
                <MenuItem value="A - Z">A - Z</MenuItem>
                <MenuItem value="Z - A">Z - A</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel className={classes.label}>Ordenar por Precio</InputLabel>
              <Select value={select.price} onChange={(e) => handleSortPrice(e)}>
                <MenuItem value="Lower to Higher">Lower to Higher</MenuItem>
                <MenuItem value="Higher to Lower">Higher to Lower</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            className={classes.gridContainer}
          >
            {currentProducts?.map((product) => {
              return (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  description={product.description}
                  image={product.image}
                  price={product.price}
                  stock={product.stock}
                />
              );
            })}
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            className={classes.root}
          >
            <Pagination
              count={Math.ceil(data.length / productsPerPage)}
              page={page}
              onChange={handleChange}
              variant="outlined"
              shape="rounded"
              color="primary"
              style={{ marginBottom: "2vw ", marginTop: "1vw" }}
            />
          </Grid>
        </>
      )}
    </div>
  );
}