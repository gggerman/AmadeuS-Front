import React from "react";
import { Typography } from "@material-ui/core";
import { CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import "./ProductDetail.css";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "50%", // 16:9
    margin: "1vh",
  },
  container : {
      width: '50%'
  }
}));

export default function ProductDetail() {
//   const product = useSelector(({app}) => app.detail);
  const dispatch = useDispatch()
  const classes = useStyles();
  const product = {
    name: "Ibanez JEM Steve Vai Signature",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sagittis dolor et libero imperdiet, in congue quam ornare. Etiam vel viverra mauris. In hac habitasse platea dictumst. In ornare odio a diam fermentum, ac dignissim dui feugiat. Sed efficitur, diam at varius hendrerit, nisl est aliquam urna, at pulvinar libero sapien at nibh. Ut varius felis non leo rutrum, a cursus mauris faucibus. Nunc lobortis justo ante, vitae facilisis enim sagittis id. Nullam sagittis tellus a ultrices auctor. Pellentesque in interdum libero. Integer sagittis imperdiet mi quis malesuada.    Ut ornare hendrerit aliquet. Nam pulvinar augue nec elementum egestas. Nullam nulla dolor, lacinia eget lectus nec, pharetra mattis elit. Sed hendrerit consequat condimentum. Nulla dapibus tempus bibendum. Sed feugiat feugiat placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean mollis mi orci, vel rhoncus odio cursus ut. Maecenas id erat dapibus, volutpat metus vitae, ornare ligula. Curabitur id massa eget nunc viverra mollis eu in purus. Nunc auctor velit sagittis arcu aliquam mattis. Suspendisse id libero in quam mattis mollis sit amet sit amet purus. Phasellus vel nulla ultrices nunc rutrum ultrices.",
    price: "120.999",
    stock: "1",
    categories: ["guitarra"],
    brand: "Ibanez",
    image:
      "https://http2.mlstatic.com/D_NQ_NP_600860-MLA31587514157_072019-O.jpg",
    rating: "5",
  };

  return (
    <div>
      <div className="container">
        <Paper elevation="24" className={classes.container}>
            <Typography component="h1">{product.name}</Typography>
            <CardMedia className={classes.media} image={product.image} />
            <Typography variant="body2" component="h3">
              {product.description}
            </Typography>
        </Paper>
        <Paper>
          <div>
            <Typography variant="body2" component="h3">
              {product.price}
            </Typography>
            <Typography variant="body2" component="h3">
              {product.stock}
            </Typography>
            <Typography variant="body2" component="h3">
              {product.brand}
            </Typography>
            <Typography variant="body2" component="h3">
              {product.categories}
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}
