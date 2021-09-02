import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";

function AddProduct() {
  const [input, setInput] = useState({
    name: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    category: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ margin: "30px", width: "700px" }}>
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
