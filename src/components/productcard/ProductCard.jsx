import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Divider,
  Modal,
  Container,
  Backdrop,
  Box
} from "@material-ui/core";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import { EmailShareButton, FacebookShareButton, WhatsappShareButton, FacebookIcon, WhatsappIcon, EmailIcon} from 'react-share';
import { Link } from "react-router-dom";
import {numberWithCommas} from '../../utils';
import addToCart from "../../redux/actions/addToCart";
import { useDispatch, useSelector } from "react-redux";
import { UserContext } from "../shoppingcart/UserContext";
import { getAllUsers } from '../../redux/actions/users';
import { getAllFavorites, addFavorite, deleteFavorite } from "../../redux/actions/favorites";
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 425,
    width: 270, // Para que las cards tengan el mismo ancho sin importar el tamaño de la imagen
    boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",

    "&:hover": {
      boxShadow: "0 10px 40px 0px rgba(0,117,49,0.3)",
    },
    // marginRight: "2vh",
    // marginBottom:"2vh"
    margin: "3vh",
  },
  media: {
    width: "100%",
    paddingTop: "95%", // 16:9
    margin: "0vh",
    backgroundSize: "contain",
  },

  price: {
    color: theme.palette.primary.dark,
    fontSize: "24px",
  },
  icon: {
    color: "grey",
    "&:hover": {
      color: theme.palette.primary.light,
    },
    "&:focus":{
      color: theme.palette.primary.light,
    }
  },
  iconDelete: {
    color: theme.palette.primary.light,
    "&:hover": {
    color: "grey",
    },
  },
  text: {
    textDecoration: "none",
  },
  button: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    width: "16vh",
    fontSize: "1.8vh",
  },
  link: {
    color: theme.palette.primary.dark,
    textDecoration: 'none',
    "&:focus": {
      color: theme.palette.primary.light
    }
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    height:'20vh',
    width:'60vh'
  },
  shareIcon: {
    width:'5vh',
    height: '5vh',
    "&:hover": {
      width: '5.2vh',
      height: '5.2vh'
    }
  }
}));

export default function ProductCard(product) {
  const { id, name, price, image, stock } = product;
  //recibe de Products las props
  const cartState = useSelector(({ cart }) => cart);
  const classes = useStyles();
  const {shoppingCart, setShoppingCart} = useContext( UserContext )
  const {cartQuantity, cartItems} = shoppingCart
  const [shareOpen, setShareOpen] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector(({ app }) => app.usersLoaded);
  const favorites = useSelector(({ app }) => app.favorites);
  const [currentUser, setCurrentUser] = useState('');
  // const [favorites, setFavorites] = useState([]);
  
  const { user } = useAuth0();
  const REACT_APP_SERVER = process.env
  
  const agregar = (e) => {
    setShoppingCart( value => ({
      ...value,
      cartQuantity: cartQuantity + 1,
    }))
    dispatch( addToCart (id))       
  } 

  const alStorage = JSON.stringify(cartState)
  
  useEffect(() => {
    window.localStorage.setItem('cant', JSON.stringify(cartQuantity) ) 
      return () =>{
        window.localStorage.setItem('cant', JSON.stringify(cartQuantity) )
      }
  }, [cartQuantity])

  useEffect(() => {
    if (user?.email) {
      dispatch(getAllUsers());
      users?.forEach(u => {
        if (u.mail === user?.email) {
          setCurrentUser(u);
          dispatch(getAllFavorites(u?._id));
        }
      })
    }
},[dispatch]);

// useEffect(() => {
//   if (currentUser?._id) {
//     users?.forEach(u => {
//       if (u.mail === user?.email) {
//         setCurrentUser(u);
//         dispatch(getAllFavorites(u?._id));
//       }
//     })
//   }
// },[dispatch]);

  function favoritesButton() {
    // if (user?.email) {
    //   dispatch(getAllUsers());
    //   users?.forEach(u => {
    //     if (u.mail === user?.email) {
    //       setCurrentUser(u);
    //       dispatch(getAllFavorites(u?._id));
    //     }
    //   })
      if (currentUser?._id) {
        let post = true;
        favorites?.forEach(favorite => {
          if (favorite._id === id) {
            dispatch(deleteFavorite(currentUser?._id, id));
            // await axios.delete(`http://localhost:3001/users/${currentUser._id}/favorites/${id}`)
            post = false;
          }
        })
        if (post) {
          dispatch(addFavorite(currentUser?._id, id));
          // await axios.post(`http://localhost:3001/users/${currentUser._id}/favorites/${id}`)
        }
        dispatch(getAllFavorites(currentUser._id));
        // await axios.get(`http://localhost:3001/users/${currentUser._id}/favorites`)
      }
    // }
  }


  const handleShare = () => {
    setShareOpen(!shareOpen)
  }
  const handleClose = () => setShareOpen(false)
  
  return (
    <Card className={classes.root}>     

      <Link to={`/detail/${id}`} className ={classes.link}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography component="h1" className={classes.price}>
            $ {numberWithCommas(price)}
          </Typography>
          <Typography variant="body2" component="h3">
            {name.substring(0,30) + '...'}
          </Typography>
          {
            (stock === 0 ? (
              <Typography variant="body2" color="error" component="p">
                Sin stock
              </Typography>
            ) : (
              <></>
            ))
          }
          <Typography variant="body2" color="textSecondary" component="p">
            Entrega en 24hs
          </Typography>
        </CardContent>

        

        <Divider variant="middle" light />
      </Link>
      { shareOpen &&
          <Box style={{display: 'flex', justifyContent: 'space-around', width: '18vh', marginTop:'-6vh', marginLeft:'25vh'}}>
               <EmailShareButton >
                 <EmailIcon className={classes.shareIcon} round={true} url ={`http://localhost:3000/detail/${id}`}/>
                </EmailShareButton>

                <FacebookShareButton >
                   <FacebookIcon className={classes.shareIcon} round={true} url ={`http://localhost:3000/detail/${id}`} />
                 </FacebookShareButton>
                  <WhatsappShareButton >
                     <WhatsappIcon className={classes.shareIcon} round={true}/>
                 </WhatsappShareButton>
          </Box>
        }
      <CardActions style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton aria-label="add to favorites"
            onClick={favoritesButton}
          >
            <FavoriteIcon className={classes.icon} />
          </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon className={classes.icon} />
        </IconButton>
        
        {/* <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={shareOpen}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                    timeout: 500,
                    }}
                >
                    <Container className={classes.paper}>
                       <EmailShareButton>
                          <EmailIcon />
                       </EmailShareButton>

                       <FacebookShareButton>
                          <FacebookIcon />
                      </FacebookShareButton>
                       <WhatsappShareButton>
                          <WhatsappIcon />
                       </WhatsappShareButton>

                   </Container>
                </Modal> */}



        <Button 
            variant="contained" 
            className={classes.button}
            onClick={ agregar }
            endIcon = {<ShoppingCartIcon />}
            >
           Agregar
        </Button>
        
      </CardActions>
      
    </Card>
  );
}
