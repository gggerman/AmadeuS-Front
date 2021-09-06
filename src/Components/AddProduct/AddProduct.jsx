import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { Input } from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { ListItemText } from "@material-ui/core";
import { getAllCategories } from "../../redux/actions/getAllCategories";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FormHelperText } from "@material-ui/core";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function AddProduct() {
  const classes = useStyles();
  const [val, setVal] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    categories: [],
    image: "",
  });
  const [errors, setErrors] = useState({});

  const categories = useSelector(({ app }) => app.categoriesLoaded);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (event) => {
    setVal(event.target.value);
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      axios.post("http://localhost:3001/products", input);
    }
  };

  // const handleUpload = (e) => {
  //   let img = e.target.files[0];
  //   setInput({
  //     ...input,
  //     [e.target.name]: URL.createObjectURL(img),
  //   });
  // }

  // const handleUploadClick = event => {
  //   console.log();
  //   var file = event.target.files[0];
  //   const reader = new FileReader();
  //   var url = reader.readAsDataURL(file);

  //   reader.onloadend = function(e) {
  //     setSelectedFile([reader.result])
  //   }.bind(this);
  //   console.log(url); // Would see a path?

  //   setSelectedFile(event.target.files[0])
  // };

  function validate() {
    let errors = {};
    if (!input.name) {
      errors.name = "Elegí el nombre";
    }
    if (!input.description) {
      errors.description = "Debe tener descripción";
    }
    if (!input.categories || !input.categories.length) {
      errors.categories = "Debes elegir categorías";
    }
    if (!input.price || !input.price.length) {
      errors.price = "Debes seleccionar precio";
    }
    if (!input.stock || !input.stock.length) {
      errors.stock = "Debes seleccionar cantidad";
    }
    if (!input.brand || !input.brand.length) {
      errors.brand = "Debe tener marca";
    }
    if (input.image && input.image.length > 255) {
      errors.image = "La URL de la imagen no debe ser mayor a 255 caracteres";
    }
    if (!input.image || !input.image.length) {
      errors.image = "Elegí una imagen";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  useEffect(() => {
    validate();
  }, [input]);

  useEffect(() => {
    setErrors({});
  }, []);

  return (
    <div>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item>
          <form
            className={classes.formControl}
            onSubmit={handleSubmit}
            style={{ margin: "30px", width: "700px" }}
          >
            <Grid container spacing={1} justifyContent="center">
              {/* <input
              accept="image/*"
              name='image'
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            /> */}
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <TextField
                    name="name"
                    label="Producto"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <FormHelperText id="component-error">
                      {errors.name}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="image"
                    label="Imagen URL"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  {errors.image && (
                    <FormHelperText id="component-error">
                      {errors.image}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="price"
                    label="Precio"
                    variant="outlined"
                    type="number"
                    onChange={handleInputChange}
                  />
                  {errors.price && (
                    <FormHelperText id="component-error">
                      {errors.price}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="brand"
                    label="Marca"
                    variant="outlined"
                    onChange={handleInputChange}
                  />
                  {errors.brand && (
                    <FormHelperText id="component-error">
                      {errors.brand}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    name="stock"
                    label="Unidades disponibles"
                    variant="outlined"
                    type="number"
                    onChange={handleInputChange}
                  />
                  {errors.stock && (
                    <FormHelperText id="component-error">
                      {errors.stock}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Categorías</InputLabel>
                    <Select
                      multiple
                      variant="outlined"
                      value={val}
                      name="categories"
                      onChange={handleSelectChange}
                      input={<Input />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      {categories.map((category) => (
                        <MenuItem key={category.name} value={category.name}>
                          <Checkbox checked={val.indexOf(category.name) > -1} />
                          <ListItemText primary={category.name} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {errors.categories && (
                    <FormHelperText id="component-error">
                      {errors.categories}
                    </FormHelperText>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="standard-multiline-static"
                    name="description"
                    label="Descripción"
                    multiline
                    variant="outlined"
                    rows={4}
                    fullWidth
                    onChange={handleInputChange}
                  />
                  {errors.description && (
                    <FormHelperText id="component-error">
                      {errors.description}
                    </FormHelperText>
                  )}
                </Grid>
              </Grid>
              <Grid item>
                <Button type="submit" color="secondary" variant="contained">
                  Publicar
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
        <Grid item>
          <Link to="/">
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>
          <Link to="/adminpanel">
            <Button variant="contained" color="primary">
              Volver
            </Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  );
}

export default AddProduct;
