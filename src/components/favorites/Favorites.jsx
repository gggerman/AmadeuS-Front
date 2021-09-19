import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { getAllUsers } from '../../redux/actions/users';
import { getAllFavorites, removeAllFavorites } from "../../redux/actions/favorites";
import Nav from "../nav/Nav";
import ProductCard from "../productcard/ProductCard";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
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
    const users = useSelector(({ app }) => app.usersLoaded);
    const favorites = useSelector(({ app }) => app.favorites);
    const [currentUser, setCurrentUser] = useState('');

    const classes = useStyles();

    // Control del paginado
    const [page, setPage] = useState(1);
    const [favoritesPerPage, setFavoritesPerPage] = useState(12);
    const indexLastFavorite = page * favoritesPerPage;
    const indexFirstFavorite = indexLastFavorite - favoritesPerPage;
    const currentFavorites = favorites.slice(indexFirstFavorite, indexLastFavorite);


    useEffect(() => {
        if(user?.email){
            dispatch(getAllUsers());
            users?.forEach(u => {
                if(u.mail === user?.email){
                    setCurrentUser(u);
                    dispatch(getAllFavorites(u?._id))
                }
            })
        }
        return () => {
            dispatch(removeAllFavorites());
        }
    },[dispatch]);

    function handleChange(event, value) {
        setPage(value);
    }

    return (
        <>
            <Nav />
            {user?.email ?
                <>
                    {/* {searchUser()} */}
                    {currentUser?._id ?
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
                                :
                                <div>No tienes Favoritos!</div>
                            }
                        </>
                        :
                        <div>Estas logueado pero no estas incluido en la Base de Datos!</div>
                    }
                </>
                :
                <div>No estas logueado!</div>
            }
        </>
    )
}
