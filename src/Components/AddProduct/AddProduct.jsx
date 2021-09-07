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
      <form  onSubmit={handleSubmit}>
      <FormControl className={classes.formControl}>
       
        <TextField
          required
          name="name"
          label="Producto"
          variant="outlined"
          onChange={handleInputChange}
        />
        {errors.name && (
          <FormHelperText id="component-error" style ={{color: 'red'}}>{errors.name}</FormHelperText>
        )}
        <TextField
          required
          name="image"
          label="Imagen URL"
          variant="outlined"
          onChange={handleInputChange}
        />
        {errors.image && (
          <FormHelperText id="component-error" style ={{color: 'red'}} >{errors.image}</FormHelperText>
        )}
        <TextField
          required
          name="price"
          label="Precio"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        {errors.price && (
          <FormHelperText id="component-error" style ={{color: 'red'}}>{errors.price}</FormHelperText>
        )}
        <TextField
          required
          name="brand"
          label="Marca"
          variant="outlined"
          onChange={handleInputChange}
        />
        {errors.brand && (
          <FormHelperText id="component-error" style ={{color: 'red'}}>{errors.brand}</FormHelperText>
        )}
        <TextField
          required
          name="stock"
          label="Unidades disponibles"
          variant="outlined"
          type="number"
          onChange={handleInputChange}
        />
        {errors.stock && (
          <FormHelperText id="component-error" style ={{color: 'red'}}>{errors.stock}</FormHelperText>
        )}
        <FormControl variant="outlined">
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
          <FormHelperText id="component-error" style ={{color: 'red'}}>
            {errors.categories}
          </FormHelperText>
        )}
        <div>
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
