import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function AddProduct() {
  const classes = useStyles();
  const [val, setVal] = useState("");
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    category: "",
    image: "",
  });
  const category = ["Guitarra", "Bajo", "Violín", "Piano"];

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (e) => {
    setVal(e.target.value);
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios.post('url', input)
    console.log(input);
  };

  return (
    <div>
      <form
        className={classes.formControl}
        onSubmit={handleSubmit}
        style={{ margin: "30px", width: "700px" }}
      >
        <div>
          <TextField
            required
            name="name"
            label="Producto"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="price"
            label="Precio"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="brand"
            label="Marca"
            variant="outlined"
            onChange={handleInputChange}
          />
          <TextField
            required
            name="stock"
            label="Unidades disponibles"
            variant="outlined"
            type="number"
            onChange={handleInputChange}
          />
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Categoría
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={val}
              label="Categoría"
              name="category"
              onChange={handleSelectChange}
            >
              {category.map((c) => (
                <MenuItem value={c}>{c}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

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
        </div>
        <Button type="submit" color="secondary" variant="contained">
          Publicar
        </Button>
      </form>
    </div>
  );
}

export default AddProduct;
