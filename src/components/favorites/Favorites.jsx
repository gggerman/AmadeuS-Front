import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllUsers } from '../../redux/actions/users';
import { getAllFavorites, addFavorite, deleteFavorite, removeAllFavorites } from "../../redux/actions/favorites";
import Nav from "../nav/Nav";
import ProductCard from "../productcard/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    // formControl: {
    //     margin: theme.spacing(1),
    //     marginTop: "-8vh",
    //     minWidth: 130,
    // },
    // label: {
    //     fontSize: "12px",
    // },
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

export default function Favorites() {
    const { user } = useAuth0();
    const dispatch = useDispatch();
    // const users = useSelector(({ app }) => app.usersLoaded);
    const favorites = useSelector(({ app }) => app.favorites);
    // const [favorites, setFavorites] = useState([]);
    // let currentUser = {};

    const classes = useStyles();

    // Control del paginado
    const [page, setPage] = useState(1);
    const [favoritesPerPage, setFavoritesPerPage] = useState(12);
    const indexLastFavorite = page * favoritesPerPage;
    const indexFirstFavorite = indexLastFavorite - favoritesPerPage;
    const currentFavorites = favorites.slice(indexFirstFavorite, indexLastFavorite);


    useEffect(() => {
        // if(user?.emal){
            dispatch(removeAllFavorites());
            dispatch(getAllFavorites('61473557ce1be32a5f867f1c'));
        // }
        return () => {
            dispatch(removeAllFavorites());
        }
    }, [dispatch,'61473557ce1be32a5f867f1c']);


    // function searchUser(){
    //     // dispatch(getAllUsers());
    //     users?.forEach(u => {
    //         if(u.mail === user?.email){
    //             currentUser = u;
    //             setFavorites(currentUser.favorites);
    //         }
    //     })
    // }

    // useEffect(() => {
    //     dispatch(getAllFavorites(currentUser?._id));
    //     return () => {
    //         dispatch(removeAllFavorites());
    //     }
    // }, [])

    // useEffect(() => {
    //     // dispatch(getAllUsers());
    //     // users?.forEach(u => {
    //     //     if(u.mail === user?.email){
    //     //         currentUser = u;
    //     //         setFavorites(currentUser.favorites);
    //     //     }
    //     // })
    // },[]);

    function handleChange(event, value) {
        setPage(value);
    }

    return (
        <>
            <Nav/>
            {/* {searchUser()}
            {currentUser?._id ?
                <div>Estas en mis favoritos! usuario {currentUser.name}</div>
                : <div>No estas logueado asi que no podes gestionar favoritos!</div>
            }
            {currentUser?._id &&  */}
            {user?.email ?
            <>
            {Array.isArray(favorites) && favorites?.length > 0 ? 
                <>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.gridContainer}
                >
                {currentFavorites?.map(favorite => {
                    return (
                        <ProductCard
                            key={favorite._id}
                            id={favorite._id}
                            name={favorite.name}
                            image={favorite.image}
                            price={favorite.price}
                            stock={favorite.stock}
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
                                    count={Math.ceil(favorites.length / favoritesPerPage)}
                                    page={page}
                                    onChange={handleChange}
                                    variant="outlined"
                                    shape="rounded"
                                    color="primary"
                                    style={{ marginBottom: "2vw ", marginTop: "1vw" }}
                                />
                            </Grid>
            </>
            : <div>No tienes favoritos!</div>
            }
            </>
            : <div>No estas logueado</div>
            }
        </>
    )
}
