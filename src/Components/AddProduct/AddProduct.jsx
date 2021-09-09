import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import {
  Input,
  Checkbox,
  ListItemText,
  FormHelperText,
  Button,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
} from "@material-ui/core";
import { getAllCategories } from "../../redux/actions/getAllCategories";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getDetails } from "../../redux/actions/getDetails";
import { useParams } from "react-router";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    width: "70vh",
    display: "absolute",
    justifyContent: "center",
  },
  btnBack: {
    backgroundColor: "#16222A",
    color: "white",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
  },
  btnPublicar: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    marginTop: "1vh",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.contrastText,
  },
}));

function AddProduct() {
  const classes = useStyles();
  const [val, setVal] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const initialInput = {
    name: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    categories: [],
    image: "",
  };
  const [input, setInput] = useState(initialInput);
  const [errors, setErrors] = useState({});
  const detail = useSelector(({ app }) => app.detail.data);
  const categories = useSelector(({ app }) => app.categoriesLoaded);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllCategories());
    if (id) {
      dispatch(getDetails(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (detail._id) {
      setInput(detail);
    }
  }, [detail]);

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
      console.log(input);
      if (input._id) {
        axios.put(`http://localhost:3001/products/${input._id}`, input);
      } else {
        axios.post("http://localhost:3001/products", input);
        setInput(initialInput);
      }
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
    if (!input.price || isNaN(input.price)) {
      errors.price = "Debes seleccionar precio";
    }
    if (isNaN(input.stock)) {
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
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl} onSubmit={handleSubmit}>
          {/* <input
              accept="image/*"
              name='image'
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            /> */}
          <TextField
            required
            name="name"
            value={input.name}
            label="Producto"
            variant="outlined"
            onChange={handleInputChange}
          />
          {errors.name && (
            <FormHelperText id="component-error">{errors.name}</FormHelperText>
          )}
          <TextField
            required
            name="image"
            value={input.image}
            label="Imagen URL"
            variant="outlined"
            onChange={handleInputChange}
          />
          {errors.image && (
            <FormHelperText id="component-error">{errors.image}</FormHelperText>
          )}
          <TextField
            required
            name="price"
            value={input.price}
            label="Precio"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          {errors.price && (
            <FormHelperText id="component-error">{errors.price}</FormHelperText>
          )}
          <TextField
            required
            name="brand"
            value={input.brand}
            label="Marca"
            variant="outlined"
            onChange={handleInputChange}
          />
          {errors.brand && (
            <FormHelperText id="component-error">{errors.brand}</FormHelperText>
          )}
          <TextField
            required
            name="stock"
            value={input.stock}
            label="Unidades disponibles"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          {errors.stock && (
            <FormHelperText id="component-error">{errors.stock}</FormHelperText>
          )}
          <FormControl variant="outlined">
            <InputLabel>Categorías</InputLabel>
            <Select
              multiple
              variant="outlined"
              value={input.categories}
              name="categories"
              onChange={handleSelectChange}
              input={<Input />}
              renderValue={(selected) =>
                categories
                  .filter((c) => selected.indexOf(c._id) > -1)
                  .map((c) => c.name)
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.name} value={category._id}>
                  <Checkbox checked={val.indexOf(category._id) > -1} />
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
          <div>
            <TextField
              id="standard-multiline-static"
              name="description"
              label="Descripción"
              value={input.description}
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
          </div>
          <Button type="submit" className={classes.btnPublicar}>
            Publicar
          </Button>

          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "5vh",
            }}
          >
            <Link to="/" className={classes.link}>
              <Button variant="contained" className={classes.btnBack}>
                Home
              </Button>
            </Link>
            <Link to="/adminpanel" className={classes.link}>
              <Button variant="contained" className={classes.btnBack}>
                Volver
              </Button>
            </Link>
          </div>
        </FormControl>
      </form>
    </div>
  );
}

export default AddProduct;
